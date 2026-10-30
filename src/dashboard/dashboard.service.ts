import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const [pages, news, faq, leaders] = await Promise.all([
      this.prisma.page.count(),
      this.prisma.newsPost.count(),
      this.prisma.faqEntry.count(),
      this.prisma.leader.count(),
    ]);

    return { pages, news, faq, leaders };
  }
}
