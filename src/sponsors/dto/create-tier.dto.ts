import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateTierDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
