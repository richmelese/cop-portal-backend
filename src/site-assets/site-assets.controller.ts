import { Body, Controller, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpsertSiteAssetDto } from "./dto/upsert-site-asset.dto";
import { SiteAssetsService } from "./site-assets.service";

@Controller("site-assets")
export class SiteAssetsController {
  constructor(private siteAssetsService: SiteAssetsService) {}

  @Get()
  findAll() {
    return this.siteAssetsService.findAll();
  }

  @Get(":key")
  findOne(@Param("key") key: string) {
    return this.siteAssetsService.findOne(key);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":key")
  upsert(@Param("key") key: string, @Body() dto: UpsertSiteAssetDto) {
    return this.siteAssetsService.upsert(key, dto.url);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":key")
  remove(@Param("key") key: string) {
    return this.siteAssetsService.remove(key);
  }
}
