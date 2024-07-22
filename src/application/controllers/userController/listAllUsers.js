const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const listAllUsers = async (req, res) => {
  try {
    const r = await prisma.User.findMany({
      select: {
        id: true,
        username: true,
        fullName: true,
        password: true,
      },
    });
    res.status(200).json(r);
  } catch (error) {
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
};
module.exports = listAllUsers;
