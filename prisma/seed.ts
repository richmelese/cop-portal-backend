import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  // --- Admin user (dev only — change this password before any real deployment) ---
  const passwordHash = await bcrypt.hash("ChangeMe123!", 10);
  await prisma.user.upsert({
    where: { email: "admin@cop32ethiopia.et" },
    update: {},
    create: {
      email: "admin@cop32ethiopia.et",
      passwordHash,
      name: "COP32 Admin",
    },
  });

  // --- FAQ ---
  const faqs = [
    {
      question: "What is COP and why does it matter?",
      answer:
        "COP (Conference of the Parties) is the UN's annual climate summit, where nearly 200 countries negotiate the global response to climate change under the UNFCCC.",
    },
    {
      question: "Who can attend COP32?",
      answer:
        "Blue Zone access is limited to accredited delegations, observers, and media. The Green Zone, coordinated by Ethiopia, is open to the private sector, academia, civil society, and the public.",
    },
    {
      question: "What themes will be prioritized?",
      answer:
        "The COP32 Action Agenda spans clean energy, zero waste, resilient cities, green industrialisation, food security, forests, youth, finance, and health.",
    },
    {
      question: "What is the difference between the Blue Zone and the Green Zone?",
      answer:
        "The Blue Zone is UN-managed territory for official negotiations. The Green Zone is organised by the host country for dialogue, exhibitions, and public engagement.",
    },
    {
      question: "Where can I book accommodation for COP32?",
      answer:
        "All official hotel bookings for delegates and attendees are managed through the COP32 accommodation platform — see the Accommodation page for details.",
    },
  ];
  await prisma.faqEntry.deleteMany();
  for (const [order, faq] of faqs.entries()) {
    await prisma.faqEntry.create({ data: { ...faq, order } });
  }

  // --- News ---
  const news = [
    {
      category: "Accommodation",
      date: "Preview",
      title: "Official COP32 Accommodation Platform Opens for Early Access",
      excerpt: "Delegates and attendees can now browse verified hotels across Addis Ababa ahead of the 2027 conference.",
    },
    {
      category: "Action Agenda",
      date: "Preview",
      title: "COP32 Presidency Outlines Ten Implementation Themes",
      excerpt: "From clean energy to resilient health systems, the draft Action Agenda sets priorities for 2027.",
    },
    {
      category: "Host City",
      date: "Preview",
      title: "Addis Ababa Begins Infrastructure Upgrades Ahead of COP32",
      excerpt: "Transport, venue, and digital infrastructure projects are underway across the host city.",
    },
  ];
  await prisma.newsPost.deleteMany();
  for (const [order, post] of news.entries()) {
    await prisma.newsPost.create({ data: { ...post, order } });
  }

  // --- Sponsor tiers ---
  const tiers = [
    {
      name: "Platinum Partners",
      slots: ["National Banking Partner", "National Telecommunications Partner"],
    },
    {
      name: "Gold Partners",
      slots: ["National Airline Partner", "Energy Partner", "Insurance Partner"],
    },
    {
      name: "Silver Partners",
      slots: ["Hospitality Partner", "Logistics Partner"],
    },
  ];
  await prisma.sponsorSlot.deleteMany();
  await prisma.sponsorTier.deleteMany();
  for (const [tierOrder, tier] of tiers.entries()) {
    await prisma.sponsorTier.create({
      data: {
        name: tier.name,
        order: tierOrder,
        slots: {
          create: tier.slots.map((category, order) => ({ category, order, status: "Partner slot open" })),
        },
      },
    });
  }

  // --- Content pages ---
  // Full transcription of every page on the site, generated from the frontend's
  // src/content/detailPages.ts (icon components swapped for their string names,
  // since Json columns can't hold React components). See prisma/seed-data/pages.json.
  const pagesData: Record<string, Record<string, unknown>> = JSON.parse(
    fs.readFileSync(path.join(__dirname, "seed-data", "pages.json"), "utf8"),
  );
  const pages = Object.entries(pagesData).map(([slug, data]) => ({ slug, ...data }));

  for (const page of pages) {
    const { slug, ...data } = page;
    await prisma.page.upsert({
      where: { slug },
      update: data as never,
      create: { slug, ...data } as never,
    });
  }

  // eslint-disable-next-line no-console
  console.log("Seed complete:", {
    faqs: faqs.length,
    news: news.length,
    tiers: tiers.length,
    pages: pages.length,
  });
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
