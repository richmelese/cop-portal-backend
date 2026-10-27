import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateLeaderDto } from "./dto/create-leader.dto";
import { QueryLeadersDto } from "./dto/query-leaders.dto";
import { UpdateLeaderDto } from "./dto/update-leader.dto";
import { LeadersService } from "./leaders.service";

@Controller("leaders")
export class LeadersController {
  constructor(private leadersService: LeadersService) {}

  @Get()
  findAll(@Query() query: QueryLeadersDto) {
    return this.leadersService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.leadersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateLeaderDto) {
    return this.leadersService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateLeaderDto) {
    return this.leadersService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.leadersService.remove(id);
  }
}
