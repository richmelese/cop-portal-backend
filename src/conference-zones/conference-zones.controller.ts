import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ConferenceZonesService } from "./conference-zones.service";
import { UpdateConferenceZoneDto } from "./dto/update-conference-zone.dto";

@Controller("conference-zones")
export class ConferenceZonesController {
  constructor(private conferenceZonesService: ConferenceZonesService) {}

  @Get()
  findAll() {
    return this.conferenceZonesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":key")
  update(@Param("key") key: string, @Body() dto: UpdateConferenceZoneDto) {
    return this.conferenceZonesService.update(key, dto);
  }
}
