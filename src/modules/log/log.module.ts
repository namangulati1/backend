import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from './entities/log.entity';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { AiModule } from '../ai/ai.module';
import { LogRepository } from './repository/log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LogEntity]), AiModule],
  controllers: [LogController],
  providers: [LogService, LogRepository],
  exports: [LogRepository],
})
export class LogModule {}
