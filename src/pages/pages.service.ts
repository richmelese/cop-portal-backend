import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.page.findMany({ orderBy: { slug: "asc" } });
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
