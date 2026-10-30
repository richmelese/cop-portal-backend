import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { ConferenceZonesModule } from "./conference-zones/conference-zones.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { FaqModule } from "./faq/faq.module";
import { LeadersModule } from "./leaders/leaders.module";
import { NewsModule } from "./news/news.module";
import { PagesModule } from "./pages/pages.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SiteAssetsModule } from "./site-assets/site-assets.module";
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
    FaqModule,
    UploadsModule,
    LeadersModule,
    SiteAssetsModule,
    ConferenceZonesModule,
  ],
})
export class AppModule {}
