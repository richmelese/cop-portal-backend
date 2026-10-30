import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateConferenceZoneDto } from "./dto/update-conference-zone.dto";

@Injectable()
export class ConferenceZonesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.conferenceZone.findMany({ orderBy: { order: "asc" } });
  }

  async update(key: string, dto: UpdateConferenceZoneDto) {
    const existing = await this.prisma.conferenceZone.findUnique({ where: { key } });
    if (!existing) throw new NotFoundException(`Conference zone "${key}" not found`);

    const { items, ...rest } = dto;
    const data: Prisma.ConferenceZoneUpdateInput = { ...rest };
    if (items) data.items = items as unknown as Prisma.InputJsonValue;
    return this.prisma.conferenceZone.update({ where: { key }, data });
  }
}
