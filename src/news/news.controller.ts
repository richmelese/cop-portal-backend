import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateNewsDto } from "./dto/create-news.dto";
import { QueryNewsDto } from "./dto/query-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { NewsService } from "./news.service";

@Controller("news")
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  findAll(@Query() query: QueryNewsDto) {
    return this.newsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.newsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateNewsDto) {
    return this.newsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateNewsDto) {
    return this.newsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.newsService.remove(id);
  }
}
