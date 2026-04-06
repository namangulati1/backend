import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('logs')
export class LogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  log: string;

  @Column()
  hash: string;

  @Column({ nullable: true })
  errorType: string;

  @Column({ nullable: true })
  severity: string;

  @Column('text', { nullable: true })
  rootCause: string;

  @Column('text', { nullable: true })
  suggestion: string;

  @CreateDateColumn()
  createdAt: Date;
}
