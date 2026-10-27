import { IsIn, IsInt, IsOptional, IsString } from "class-validator";

export const LEADER_COLORS = ["navy", "green", "blue"] as const;

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
  @IsInt()
  order?: number;
}
