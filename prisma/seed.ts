// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create a default staff account
  const staffPassword = "password123"; // change for production
  const hashedStaff = await bcrypt.hash(staffPassword, 10);

  const staff = await prisma.user.upsert({
    where: { email: "staff@example.com" },
    update: {},
    create: {
      id: "staff1",
      name: "Default Staff",
      email: "staff@example.com",
      password: hashedStaff,
      role: "STAFF",
    },
  });

  // Create a normal user for testing
  const userPassword = "password123";
  const hashedUser = await bcrypt.hash(userPassword, 10);
  const user = await prisma.user.upsert({
    where: { email: "sharon@example.com" },
    update: {},
    create: {
      id: "user1",
      name: "Sharon Test",
      email: "sharon@example.com",
      password: hashedUser,
      role: "USER",
      image: "https://i.pravatar.cc/150?img=3",
    },
  });

  // Seed AFRACA event
  const event1 = await prisma.event.upsert({
    where: { id: "AFRACA8thCongress" },
    update: {},
    create: {
      id: "AFRACA8thCongress",
      title: "8th World Congress on Rural and Agricultural Finance",
      description: "A global forum for rural and agricultural finance.",
      location: "Nairobi, Kenya",
      date: new Date("2025-09-15T18:00:00Z"),
      organizerId: user.id,
    },
  });

  // Seed DefaultEvent
  const defaultEvent = await prisma.event.upsert({
    where: { id: "DefaultEvent" },
    update: {},
    create: {
      id: "DefaultEvent",
      title: "Default Event",
      description: "Fallback default event.",
      location: "TBD",
      date: new Date(),
      organizerId: user.id,
    },
  });

  // Registration example
  await prisma.registration.upsert({
    where: {
      userId_eventId: {
        userId: user.id,
        eventId: event1.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      eventId: event1.id,
    },
  });

  console.log("✅ Seed completed!");
  console.log({ staff: { email: staff.email }, user: { email: user.email }, event1: event1.id, defaultEvent: defaultEvent.id });
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
