import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateSlotDto {
  @IsString()
  category!: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
