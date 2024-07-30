const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const decryptToken = require("../../../../core/utils/token");

const addLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Yetkilendirme gerekli." });
    }

    const userId = await decryptToken(token);
    if (!userId) {
      return res.status(403).json({ message: "Geçersiz token." });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: userId },
    });

    if (!profile) {
      return res.status(404).json({ message: "Kullanıcı profili bulunamadı." });
    }

    // Beğeni zaten var mı kontrolü
    const existingLike = await prisma.like.findFirst({
      where: {
          profileId: profile.id,
          postId: Number(postId),
      },
    });

    if (existingLike) {
      return res.status(400).json({ message: "Bu gönderiyi zaten beğendiniz." });
    }

    const newLike = await prisma.like.create({
      data: {
        profileId: profile.id,
        postId: Number(postId),
      },
    });

    res.status(200).json(newLike);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Beğeni eklenirken hata meydana geldi." });
  }
};

module.exports = addLike;
