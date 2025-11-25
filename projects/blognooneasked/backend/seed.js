const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

let prisma;

async function resetPrismaClient() {
  // Disconnect any existing client connection first
  if (prisma) {
    await prisma.$disconnect();
  }

  // Create and return a fresh Prisma client
  prisma = new PrismaClient();
  return prisma;
}

async function createUser({ email, password, name, role = "USER" }) {
  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log(`User with email ${email} already exists.`);
    return existingUser;
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
    },
  });

  return user;
}

async function main() {
  console.log("Resetting the database...");

  // Create a fresh Prisma client instance for seeding
  prisma = await resetPrismaClient();

  // Clear previous records
  await prisma.refreshToken.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const admin = await createUser({
    email: process.env.DEMO_ADMIN_EMAIL,
    password: process.env.DEMO_ADMIN_PASS,
    role: "ADMIN",
    name: "Iryna Matsiuk",
  });
  console.log("Admin user created:", admin);

  // Create regular user
  const firstUser = await createUser({
    email: process.env.DEMO_USER2_EMAIL,
    password: process.env.DEMO_USER1_PASS,
    role: "USER",
    name: "John Doe",
  });
  console.log("First regular user created:", firstUser);

  const secondUser = await createUser({
    email: process.env.DEMO_USER2_EMAIL,
    password: process.env.DEMO_USER1_PASS,
    role: "USER",
    name: "Jane Doe",
  });
  console.log("Secon regular user created:", secondUser);

  // Seed posts
  const postsData = [
    {
      title: "How do you catch a squirrel?",
      content:
        "Climb a tree and act like a nut — which, frankly, is more of a lifestyle choice than a strategy. Squirrels are tiny chaos gremlins who can sense normal behavior from miles away, so your best chance is to embrace full weirdness. Just don’t expect gratitude; if anything, they’ll judge you from a branch while plotting to steal your snacks.",
      authorId: admin.id,
      published: true,
    },
    {
      title: "Why don’t clouds ever get lost?",
      content:
        "Clouds never get lost because they’re too busy minding everyone else’s plans. Want to go hiking? They’ll follow you. Planning a picnic? They’ll arrive early. They float around looking innocent, but deep down they know exactly when their dramatic, unnecessary rain entrance will cause maximum inconvenience.",
      authorId: admin.id,
      published: true,
    },
    {
      title: "Why are plants so dramatic when they don’t get water?",
      content:
        "Miss one watering and your plant collapses like it’s auditioning for a tragic role in a telenovela. Give it water and it springs back instantly, pretending nothing happened. Plants aren’t fragile — they’re just emotional divas with leaves, and neglect is their favorite form of revenge theater.",
      authorId: admin.id,
    },
    {
      title: "What did one ocean say to the other ocean?",
      content:
        "Nothing — they just waved, but don’t let that fool you into thinking oceans are polite. That wave was definitely the liquid version of a sarcastic “hi.” Oceans love drama: stealing beaches, tossing boats, rearranging coastlines like furniture. They communicate entirely through passive-aggressive splashes, which honestly feels very relatable.",
      authorId: admin.id,
      published: true,
    },
  ];

  const createdPosts = [];

  for (const data of postsData) {
    try {
      const post = await prisma.post.create({ data });
      createdPosts.push(post);
      console.log("Post created:", post);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  // Seed comments
  await prisma.comment.createMany({
    data: [
      {
        content: "Acting like a nut is also how I make friends.",
        authorId: firstUser.id,
        postId: createdPosts[0].id,
      },
      {
        content: "Clouds: 1, My picnic: 0.",
        authorId: secondUser.id,
        postId: createdPosts[1].id,
      },
      {
        content: "I swear clouds plan their attacks",
        authorId: firstUser.id,
        postId: createdPosts[1].id,
      },
      {
        content: "Oceans are 70% water and 30% attitude.",
        authorId: firstUser.id,
        postId: createdPosts[3].id,
      },
      {
        content: "This explains why I always feel judged at the beach.",
        authorId: secondUser.id,
        postId: createdPosts[3].id,
      },
    ],
  });

  console.log("Database reset complete.");

  // Check data in database
  const allUsers = await prisma.user.findMany();
  const allPosts = await prisma.post.findMany();
  const allComments = await prisma.comment.findMany();
  console.log("Users:", allUsers);
  console.log("Posts:", allPosts);
  console.log("Comments:", allComments);

  // Disconnect from Prisma client
  await prisma.$disconnect();
}

if (require.main === module) {
  // Run directly if executed via 'node seed.js'
  main().catch((e) => {
    console.error(e);
    if (prisma) {
      prisma.$disconnect();
    }
    // Exit the Node.js process with status code 1, which signals an error.
    process.exit(1);
  });
} else {
  module.exports = main;
}
