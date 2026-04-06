import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { LogEntity } from './entities/log.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnalyzeLogDto } from './log.interface';
import * as crypto from 'crypto';
import { LogRepository } from './repository/log.repository';

@Injectable()
export class LogService {
  constructor(
    private readonly aiService: AiService,
    private readonly logRepository: LogRepository,
  ) {}

  async analyze(dto: AnalyzeLogDto) {
    try {
      const hash = crypto.createHash('md5').update(dto.log).digest('hex');

      const count = await this.logRepository.countByHash(hash);
      const aiRaw = await this.aiService.analyzeLog(dto.log);
      const parsed = this.extractJSON(aiRaw) || {
        errorType: 'UNKNOWN',
        rootCause: aiRaw,
        suggestion: '',
        severity: 'low',
      };

      // 💾 save to DB
      const log = new LogEntity();
      log.log = dto.log;
      log.hash = hash;
      log.errorType = parsed.errorType;
      log.rootCause = parsed.rootCause;
      log.suggestion = parsed.suggestion;
      log.severity = parsed.severity;

      const saved = await this.logRepository.create(log);

      return {
        ...saved,
        occurrences: count + 1,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  private extractJSON(text: string) {
    if (!text) return null;

    try {
      // remove markdown code blocks
      const cleaned = text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const match = cleaned.match(/{[\s\S]*}/);

      return match ? JSON.parse(match[0]) : null;
    } catch (err) {
      console.error('JSON parse failed:', err);
      return null;
    }
  }

  async getAnalytics() {
    const [totalLogs, errorTypeDistribution, severityDistribution, topErrors] =
      await Promise.all([
        this.logRepository.getTotalLogs(),
        this.logRepository.getErrorTypeDistribution(),
        this.logRepository.getSeverityDistribution(),
        this.logRepository.getTopErrors(),
      ]);

    return {
      totalLogs,
      errorTypeDistribution,
      severityDistribution,
      topErrors,
    };
  }
}
