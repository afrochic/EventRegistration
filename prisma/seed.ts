import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create a sample user
  const user = await prisma.user.create({
    data: {
      name: "Sharon Test",
      email: "sharon@example.com",
      image: "https://i.pravatar.cc/150?img=3",
    },
  });

  // 2. Create a sample event
  const event = await prisma.event.create({
    data: {
      title: "Next.js Launch Party",
      description: "A community meetup to discuss Next.js features.",
      location: "Nairobi, Kenya",
      date: new Date("2025-09-15T18:00:00Z"),
      organizerId: user.id,
    },
  });

  // 3. Register the user for the event
  const registration = await prisma.registration.create({
    data: {
      userId: user.id,
      eventId: event.id,
    },
  });

  console.log("✅ Seed completed!");
  console.log({ user, event, registration });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
