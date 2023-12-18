import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsUrl } from 'class-validator';

export class CreateMentorDto {
  @ApiProperty()
  @IsArray()
  @IsUrl({}, { each: true })
  readonly certificates: string[];

  @ApiProperty()
  @IsString({
    each: true,
  })
  readonly skills: string[];

  @ApiProperty()
  @IsString()
  readonly description: string;
}
