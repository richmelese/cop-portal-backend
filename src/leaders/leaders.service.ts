import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { paginatedResult, paginationParams } from "../common/utils/paginate.util";
import { CreateLeaderDto } from "./dto/create-leader.dto";
import { QueryLeadersDto } from "./dto/query-leaders.dto";
import { UpdateLeaderDto } from "./dto/update-leader.dto";

@Injectable()
export class LeadersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryLeadersDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 50;
    const where = {
      ...(query.tag ? { tag: { equals: query.tag, mode: "insensitive" as const } } : {}),
      ...(query.color ? { color: query.color } : {}),
      ...(query.displayAs ? { displayAs: query.displayAs } : {}),
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search, mode: "insensitive" as const } },
              { role: { contains: query.search, mode: "insensitive" as const } },
              { quote: { contains: query.search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.leader.findMany({ where, orderBy: { order: "asc" }, ...paginationParams(page, limit) }),
      this.prisma.leader.count({ where }),
    ]);

    return paginatedResult(data, page, limit, total);
  }

  async findOne(id: string) {
    const leader = await this.prisma.leader.findUnique({ where: { id } });
    if (!leader) throw new NotFoundException(`Leader "${id}" not found`);
    return leader;
  }

  create(dto: CreateLeaderDto) {
    return this.prisma.leader.create({ data: dto });
  }

  async update(id: string, dto: UpdateLeaderDto) {
    await this.findOne(id);
    return this.prisma.leader.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.leader.delete({ where: { id } });
  }
}
