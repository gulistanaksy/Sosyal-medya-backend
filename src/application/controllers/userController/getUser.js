const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const decryptToken = require("../../../../core/utils/token")


const getUser = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Token gerekli." });
    }
    const userId = await decryptToken(token)
    if (!userId) {
      return res.status(403).json({ message: "Geçersiz token." });
    }
    const getUser = await prisma.user.findUnique({
      where:{
        id:Number(userId),
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        email:true,
        profile: true
      },
    });
    if (!getUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
};
module.exports = getUser;
