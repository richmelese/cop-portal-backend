import { Module } from "@nestjs/common";
import { SiteAssetsController } from "./site-assets.controller";
import { SiteAssetsService } from "./site-assets.service";

@Module({
  controllers: [SiteAssetsController],
  providers: [SiteAssetsService],
})
export class SiteAssetsModule {}
