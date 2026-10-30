import { Module } from "@nestjs/common";
import { ConferenceZonesController } from "./conference-zones.controller";
import { ConferenceZonesService } from "./conference-zones.service";

@Module({
  controllers: [ConferenceZonesController],
  providers: [ConferenceZonesService],
})
export class ConferenceZonesModule {}
