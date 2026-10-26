import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.newsPost.findMany({ orderBy: { order: "asc" } });
  }

  async findOne(id: string) {
    const post = await this.prisma.newsPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException(`News post "${id}" not found`);
    return post;
  }

  create(dto: CreateNewsDto) {
    return this.prisma.newsPost.create({ data: dto });
  }

  async update(id: string, dto: UpdateNewsDto) {
    await this.findOne(id);
    return this.prisma.newsPost.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.newsPost.delete({ where: { id } });
  }
}
