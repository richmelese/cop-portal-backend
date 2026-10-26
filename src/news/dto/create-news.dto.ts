import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateNewsDto {
  @IsString()
  category!: string;

  @IsString()
  date!: string;

  @IsString()
  title!: string;

  @IsString()
  excerpt!: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
