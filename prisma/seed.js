const { PrismaClient } = require("@prisma/client");
const majors = require("../documents/majors.json");
const universities = require("../documents/universities.json");

const db = new PrismaClient();

const main = async () => {
  const univs = await db.university.createMany({ data: universities });
  console.log(univs.count);
  const mjs = await db.major.createMany({ data: majors });
  console.log(mjs.count);

  console.log("Seed success");
  db.$disconnect();
};

main();
