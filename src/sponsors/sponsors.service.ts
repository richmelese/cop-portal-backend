import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { paginatedResult, paginationParams } from "../common/utils/paginate.util";
import { CreateSlotDto } from "./dto/create-slot.dto";
import { CreateTierDto } from "./dto/create-tier.dto";
import { QueryTiersDto } from "./dto/query-tiers.dto";
import { UpdateSlotDto } from "./dto/update-slot.dto";
import { UpdateTierDto } from "./dto/update-tier.dto";

@Injectable()
export class SponsorsService {
  constructor(private prisma: PrismaService) {}

  async findAllTiers(query: QueryTiersDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 50;
    const where = query.search ? { name: { contains: query.search, mode: "insensitive" as const } } : {};

    const [data, total] = await Promise.all([
      this.prisma.sponsorTier.findMany({
        where,
        orderBy: { order: "asc" },
        include: { slots: { orderBy: { order: "asc" } } },
        ...paginationParams(page, limit),
      }),
      this.prisma.sponsorTier.count({ where }),
    ]);

    return paginatedResult(data, page, limit, total);
  }

  async findTier(id: string) {
    const tier = await this.prisma.sponsorTier.findUnique({ where: { id }, include: { slots: true } });
    if (!tier) throw new NotFoundException(`Sponsor tier "${id}" not found`);
    return tier;
  }

  createTier(dto: CreateTierDto) {
    return this.prisma.sponsorTier.create({ data: dto });
  }

  async updateTier(id: string, dto: UpdateTierDto) {
    await this.findTier(id);
    return this.prisma.sponsorTier.update({ where: { id }, data: dto });
  }

  async removeTier(id: string) {
    await this.findTier(id);
    return this.prisma.sponsorTier.delete({ where: { id } });
  }

  async createSlot(tierId: string, dto: CreateSlotDto) {
    await this.findTier(tierId);
    return this.prisma.sponsorSlot.create({ data: { ...dto, tierId } });
  }

  async updateSlot(id: string, dto: UpdateSlotDto) {
    const slot = await this.prisma.sponsorSlot.findUnique({ where: { id } });
    if (!slot) throw new NotFoundException(`Sponsor slot "${id}" not found`);
    return this.prisma.sponsorSlot.update({ where: { id }, data: dto });
  }

  async removeSlot(id: string) {
    const slot = await this.prisma.sponsorSlot.findUnique({ where: { id } });
    if (!slot) throw new NotFoundException(`Sponsor slot "${id}" not found`);
    return this.prisma.sponsorSlot.delete({ where: { id } });
  }
}
