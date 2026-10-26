import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreatePageDto {
  @IsString()
  slug!: string;

  @IsString()
  title!: string;

  @IsString()
  eyebrow!: string;

  @IsString()
  sectionLabel!: string;

  @IsOptional()
  @IsString()
  sectionHref?: string;

  @IsString()
  summary!: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsBoolean()
  showWeather?: boolean;

  @IsOptional()
  @IsBoolean()
  visitor?: boolean;

  @IsOptional()
  @IsString()
  visitorLabel?: string;

  // Flexible structured content — array of section objects (heading/body/facts/etc.)
  // IsOptional is required here even though this is logically required: without SOME
  // class-validator decorator, ValidationPipe's whitelist:true silently strips this
  // property from every request before it reaches the service.
  @IsOptional()
  sections!: unknown;

  @IsOptional()
  timeline?: unknown;

  @IsOptional()
  stats?: unknown;
}
