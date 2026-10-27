import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { paginatedResult, paginationParams } from "../common/utils/paginate.util";
import { CreatePageDto } from "./dto/create-page.dto";
import { QueryPagesDto } from "./dto/query-pages.dto";
import { UpdatePageDto } from "./dto/update-page.dto";

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryPagesDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 50;
    const where = {
      ...(query.sectionLabel ? { sectionLabel: { equals: query.sectionLabel, mode: "insensitive" as const } } : {}),
      ...(query.search
        ? {
            OR: [
              { title: { contains: query.search, mode: "insensitive" as const } },
              { slug: { contains: query.search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.page.findMany({ where, orderBy: { slug: "asc" }, ...paginationParams(page, limit) }),
      this.prisma.page.count({ where }),
    ]);

    return paginatedResult(data, page, limit, total);
  }

  async findBySlug(slug: string) {
    const page = await this.prisma.page.findUnique({ where: { slug } });
    if (!page) throw new NotFoundException(`Page "${slug}" not found`);
    return page;
  }

  create(dto: CreatePageDto) {
    return this.prisma.page.create({ data: dto as never });
  }

  async update(slug: string, dto: UpdatePageDto) {
    await this.findBySlug(slug);
    return this.prisma.page.update({ where: { slug }, data: dto as never });
  }

  async remove(slug: string) {
    await this.findBySlug(slug);
    return this.prisma.page.delete({ where: { slug } });
  }
}
