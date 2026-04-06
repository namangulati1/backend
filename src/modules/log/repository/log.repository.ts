import { Repository } from 'typeorm';
import { LogEntity } from '../entities/log.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LogRepository {
  constructor(
    @InjectRepository(LogEntity)
    private readonly logRepository: Repository<LogEntity>,
  ) {}
  async findByHash(hash: string) {
    return this.logRepository.findOne({ where: { hash } });
  }

  async countByHash(hash: string) {
    return this.logRepository.count({ where: { hash } });
  }

  async create(log: LogEntity) {
    return this.logRepository.save(log);
  }

  async getTotalLogs() {
    return this.logRepository.count();
  }

  async getErrorTypeDistribution() {
    return this.logRepository
      .createQueryBuilder('log')
      .select('log.errorType', 'type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('log.errorType')
      .getRawMany();
  }

  async getSeverityDistribution() {
    return this.logRepository
      .createQueryBuilder('log')
      .select('log.severity', 'severity')
      .addSelect('COUNT(*)', 'count')
      .groupBy('log.severity')
      .getRawMany();
  }

  async getTopErrors(limit = 5) {
    return this.logRepository
      .createQueryBuilder('log')
      .select('log.hash', 'hash')
      .addSelect('COUNT(*)', 'count')
      .groupBy('log.hash')
      .orderBy('count', 'DESC')
      .limit(limit)
      .getRawMany();
  }
}
