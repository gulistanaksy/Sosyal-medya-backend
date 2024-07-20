const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userCreate = async (req, res) => {
  try {
    console.log("user create");
    const { username, fullName, email, password } = req.body;
    prisma.User.create({
      data: {
        username,
        fullName,
        email,
        password,
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
};

module.exports = userCreate;


// await ile 
/*
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userCreate = async (req, res) => {
  try {
    console.log("user create");
    const { username, fullName, email, password } = req.body;

    const newUser = await prisma.user.create({
      data: {
        username,
        fullName,
        email,
        password,
      },
    });

    res.status(201).json(newUser);
    console.log("r", newUser);
  } catch (error) {
    console.log("e", error);
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
};

module.exports = userCreate;


*/