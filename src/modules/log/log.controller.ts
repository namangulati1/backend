import { Controller, Post, Body } from '@nestjs/common';
import { LogService } from './log.service';
import { AnalyzeLogDto } from './log.interface';

@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post('analyze')
  async analyze(@Body() dto: AnalyzeLogDto) {
    return this.logService.analyze(dto);
  }
}
