import { Repository } from 'typeorm';
import { LogEntity } from '../entities/log.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LogRepository {
  constructor(
    @InjectRepository(LogEntity)
    private readonly logRepository: Repository<LogEntity>
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
}
