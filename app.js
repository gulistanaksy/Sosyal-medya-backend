const express = require("express");
const app = express();
const router = express.Router();
//https://www.prisma.io/docs/orm/reference/prisma-schema-reference
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
const PORT = process.env.PORT || 5000;

//! API
router.get("/listAllPersons", async (req, res) => {
  console.log("listallpersons");
  try {
    const r = await prisma.person.findMany({
      select: {
        age: true,
        id: true,
        name: true,
      },
    });
    res.status(200).json(r);
    console.log(r);
  } catch (error) {
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
});
router.post("/createPerson", async (req, res) => {
  try {
    const { email, name, age } = req.body;
    prisma.person
      .create({
        data: {
          email,
          age,
          name,
        },
      })
      .then((r) => {
        // dönen cevap
        res.status(201).json(r);
        console.log("r", r);
      })
      .catch((e) => {
        console.log("e", e);
      });
  } catch (error) {
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
});
app.use(express.json());
app.use(router);

///! database bağlantısı.
const connectToDb = async () => {
  try {
    await prisma.$connect();
    console.log("success");
    app.listen(PORT, () => {
      console.log(`running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Bir hata oluştu.", error);
  }
};

prisma.$on("query", (e) => {
  console.log("Query:" + e.query);
  console.log("Params:" + e.params);
  console.log("QuerDuration:" + e.duration + "ms");
});

connectToDb();
