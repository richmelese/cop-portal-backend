import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateSlotDto } from "./dto/create-slot.dto";
import { CreateTierDto } from "./dto/create-tier.dto";
import { QueryTiersDto } from "./dto/query-tiers.dto";
import { UpdateSlotDto } from "./dto/update-slot.dto";
import { UpdateTierDto } from "./dto/update-tier.dto";
import { SponsorsService } from "./sponsors.service";

@Controller("sponsors/tiers")
export class SponsorsController {
  constructor(private sponsorsService: SponsorsService) {}

  @Get()
  findAll(@Query() query: QueryTiersDto) {
    return this.sponsorsService.findAllTiers(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.sponsorsService.findTier(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTierDto) {
    return this.sponsorsService.createTier(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateTierDto) {
    return this.sponsorsService.updateTier(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.sponsorsService.removeTier(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":tierId/slots")
  createSlot(@Param("tierId") tierId: string, @Body() dto: CreateSlotDto) {
    return this.sponsorsService.createSlot(tierId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("slots/:id")
  updateSlot(@Param("id") id: string, @Body() dto: UpdateSlotDto) {
    return this.sponsorsService.updateSlot(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("slots/:id")
  removeSlot(@Param("id") id: string) {
    return this.sponsorsService.removeSlot(id);
  }
}
