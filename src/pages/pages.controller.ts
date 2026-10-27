import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreatePageDto } from "./dto/create-page.dto";
import { QueryPagesDto } from "./dto/query-pages.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { PagesService } from "./pages.service";

// Page slugs are multi-segment (e.g. "presidency/what-is-cop"), so the dynamic
// routes below use a wildcard param. Express 5 / path-to-regexp v7 returns a
// wildcard param as an array of segments, so we join it back into a slug.
function toSlug(param: string | string[]): string {
  return Array.isArray(param) ? param.join("/") : param;
}

@Controller("pages")
export class PagesController {
  constructor(private pagesService: PagesService) {}

  @Get()
  findAll(@Query() query: QueryPagesDto) {
    return this.pagesService.findAll(query);
  }

  @Get("*slug")
  findOne(@Param("slug") slug: string | string[]) {
    return this.pagesService.findBySlug(toSlug(slug));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreatePageDto) {
    return this.pagesService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("*slug")
  update(@Param("slug") slug: string | string[], @Body() dto: UpdatePageDto) {
    return this.pagesService.update(toSlug(slug), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("*slug")
  remove(@Param("slug") slug: string | string[]) {
    return this.pagesService.remove(toSlug(slug));
  }
}
