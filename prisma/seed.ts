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

  // --- Leaders (homepage quote carousel) ---
  const leaders = [
    {
      tag: "Presidency",
      name: "COP32 President-Designate",
      role: "COP32 Presidency",
      quote:
        "COP32 is a meeting point for dialogue, consensus, and implementation-focused action — for Ethiopia, for Africa, and for the world.",
      color: "navy",
      // Featured in the homepage hero Leader Quote section (see LeaderQuote.tsx).
      displayAs: "pm",
    },
    {
      tag: "Government",
      name: "Minister of Planning and Development",
      role: "Federal Democratic Republic of Ethiopia",
      quote: "Climate resilience and economic development must move together. Addis Ababa gives us the platform to show how.",
      color: "green",
    },
    {
      tag: "Host City",
      name: "Mayor of Addis Ababa",
      role: "Addis Ababa City Administration",
      quote: "Hosting COP32 is a chance to show what an African city can deliver when the world comes to the table.",
      color: "blue",
    },
  ];
  await prisma.leader.deleteMany();
  for (const [order, leader] of leaders.entries()) {
    await prisma.leader.create({ data: { ...leader, order } });
  }

  // --- Conference zones (homepage "COP32 Areas" section) ---
  // Upsert with an empty `update` — once an admin edits a zone's content, re-running
  // the seed must never overwrite it (a prior seed re-run once wiped live admin edits).
  const zones = [
    {
      key: "blue",
      name: "Blue Zone",
      tone: "navy",
      description: "The UN-managed official negotiation area, under the authority of the UNFCCC.",
      note: "The Blue Zone is where formal negotiations take place and global climate policy is shaped.",
      items: [
        { icon: "Landmark", text: "Heads of State and Ministers" },
        { icon: "Globe2", text: "National delegations" },
        { icon: "Users", text: "Accredited observers" },
        { icon: "Building2", text: "International organizations" },
      ],
      order: 0,
    },
    {
      key: "green",
      name: "Green Zone",
      tone: "green",
      description: "Coordinated by Ethiopia as host country, and open to the wider public.",
      note: "The Green Zone is the public heart of COP32, open to everyone building the climate movement.",
      items: [
        { icon: "Briefcase", text: "Private sector" },
        { icon: "GraduationCap", text: "Academia" },
        { icon: "Megaphone", text: "Civil society" },
        { icon: "Rocket", text: "Youth representatives and startups" },
      ],
      order: 1,
    },
  ];
  for (const { key, ...data } of zones) {
    await prisma.conferenceZone.upsert({ where: { key }, update: {}, create: { key, ...data } });
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
    leaders: leaders.length,
    zones: zones.length,
    news: news.length,
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
