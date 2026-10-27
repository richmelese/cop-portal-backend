import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { paginatedResult, paginationParams } from "../common/utils/paginate.util";
import { CreateFaqDto } from "./dto/create-faq.dto";
import { QueryFaqDto } from "./dto/query-faq.dto";
import { UpdateFaqDto } from "./dto/update-faq.dto";

@Injectable()
export class FaqService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryFaqDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 50;
    const where = query.search
      ? {
          OR: [
            { question: { contains: query.search, mode: "insensitive" as const } },
            { answer: { contains: query.search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.faqEntry.findMany({ where, orderBy: { order: "asc" }, ...paginationParams(page, limit) }),
      this.prisma.faqEntry.count({ where }),
    ]);

    return paginatedResult(data, page, limit, total);
  }

  async findOne(id: string) {
    const entry = await this.prisma.faqEntry.findUnique({ where: { id } });
    if (!entry) throw new NotFoundException(`FAQ entry "${id}" not found`);
    return entry;
  }

  create(dto: CreateFaqDto) {
    return this.prisma.faqEntry.create({ data: dto });
  }

  async update(id: string, dto: UpdateFaqDto) {
    await this.findOne(id);
    return this.prisma.faqEntry.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.faqEntry.delete({ where: { id } });
  }
}
