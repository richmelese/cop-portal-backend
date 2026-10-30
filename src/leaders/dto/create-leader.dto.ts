import { IsIn, IsInt, IsOptional, IsString } from "class-validator";

export const LEADER_COLORS = ["navy", "green", "blue"] as const;
export const LEADER_DISPLAY_AS = ["leader", "pm"] as const;

export class CreateLeaderDto {
  @IsString()
  tag!: string;

  @IsString()
  name!: string;

  @IsString()
  role!: string;

  @IsString()
  quote!: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsIn(LEADER_COLORS)
  color?: string;

  @IsOptional()
  @IsIn(LEADER_DISPLAY_AS)
  displayAs?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
