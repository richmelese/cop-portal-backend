import { Type } from "class-transformer";
import { IsArray, IsIn, IsOptional, IsString, ValidateNested } from "class-validator";

export class ZoneItemDto {
  @IsString()
  icon!: string;

  @IsString()
  text!: string;
}

export class UpdateConferenceZoneDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsIn(["navy", "green"])
  tone?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ZoneItemDto)
  items?: ZoneItemDto[];
}
