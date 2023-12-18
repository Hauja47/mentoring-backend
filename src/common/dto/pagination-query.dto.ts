import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsPositive()
  @IsOptional()
  page: number;

  @IsPositive()
  @IsOptional()
  limit: number;
}
