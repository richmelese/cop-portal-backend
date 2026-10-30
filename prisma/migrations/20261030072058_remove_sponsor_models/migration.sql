-- DropForeignKey
ALTER TABLE "SponsorSlot" DROP CONSTRAINT IF EXISTS "SponsorSlot_tierId_fkey";

-- DropTable
DROP TABLE IF EXISTS "SponsorSlot";

-- DropTable
DROP TABLE IF EXISTS "SponsorTier";
