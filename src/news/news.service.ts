import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { paginatedResult, paginationParams } from "../common/utils/paginate.util";
import { CreateNewsDto } from "./dto/create-news.dto";
import { QueryNewsDto } from "./dto/query-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryNewsDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 50;
    const where = {
      ...(query.category ? { category: { equals: query.category, mode: "insensitive" as const } } : {}),
      ...(query.search
        ? {
            OR: [
              { title: { contains: query.search, mode: "insensitive" as const } },
              { excerpt: { contains: query.search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.newsPost.findMany({ where, orderBy: { order: "asc" }, ...paginationParams(page, limit) }),
      this.prisma.newsPost.count({ where }),
    ]);

    return paginatedResult(data, page, limit, total);
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
