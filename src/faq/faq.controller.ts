import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateFaqDto } from "./dto/create-faq.dto";
import { QueryFaqDto } from "./dto/query-faq.dto";
import { UpdateFaqDto } from "./dto/update-faq.dto";
import { FaqService } from "./faq.service";

@Controller("faq")
export class FaqController {
  constructor(private faqService: FaqService) {}

  @Get()
  findAll(@Query() query: QueryFaqDto) {
    return this.faqService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.faqService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateFaqDto) {
    return this.faqService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateFaqDto) {
    return this.faqService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.faqService.remove(id);
  }
}
