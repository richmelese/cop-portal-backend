import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { FaqModule } from "./faq/faq.module";
import { LeadersModule } from "./leaders/leaders.module";
import { NewsModule } from "./news/news.module";
import { PagesModule } from "./pages/pages.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SponsorsModule } from "./sponsors/sponsors.module";
import { UploadsModule } from "./uploads/uploads.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    DashboardModule,
    PagesModule,
    NewsModule,
    SponsorsModule,
    FaqModule,
    UploadsModule,
    LeadersModule,
  ],
})
export class AppModule {}
