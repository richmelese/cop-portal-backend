import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateFaqDto } from "./dto/create-faq.dto";
import { UpdateFaqDto } from "./dto/update-faq.dto";

@Injectable()
export class FaqService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.faqEntry.findMany({ orderBy: { order: "asc" } });
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
