import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CandidateRequest {
  constructor(obj?: any) {
    Object.assign(this, obj);
  }

  @IsString()
  @IsOptional()
  public id: string;

  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsString()
  @IsOptional()
  public status: string;
}
