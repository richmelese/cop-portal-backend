import { IsString } from "class-validator";

export class UpsertSiteAssetDto {
  @IsString()
  url!: string;
}
