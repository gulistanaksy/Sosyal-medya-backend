const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const decryptToken = require("../../../../core/utils/token");

const addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Yetkilendirme gerekli." });
    }

    const userId = await decryptToken(token);
    if (!userId) {
      return res.status(403).json({ message: "Geçersiz token." });
    }

    if (!postId || !content) {
      return res.status(400).json({ message: "Post ID ve içerik gerekli." });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: userId },
    });

    if (!profile) {
      return res.status(404).json({ message: "Kullanıcı profili bulunamadı." });
    }

    const newComment = await prisma.comment.create({
      data: {
        postId: Number(postId),
        profileId: profile.id,
        content,
      },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Yorum eklenirken hata meydana geldi." });
  }
};

module.exports = addComment;
