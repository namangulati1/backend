import { IsString } from 'class-validator';

export class AnalyzeLogDto {
  @IsString()
  log: string;
}
