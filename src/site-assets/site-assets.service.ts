import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SiteAssetsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.siteAsset.findMany();
  }

  // Returns null rather than throwing when unset — callers treat "no custom image yet"
  // as a normal state (they fall back to the section's built-in default graphic).
  findOne(key: string) {
    return this.prisma.siteAsset.findUnique({ where: { key } });
  }

  upsert(key: string, url: string) {
    return this.prisma.siteAsset.upsert({
      where: { key },
      create: { key, url },
      update: { url },
    });
  }

  async remove(key: string) {
    await this.prisma.siteAsset.deleteMany({ where: { key } });
  }
}
