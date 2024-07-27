const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const decryptToken = require("../../../../core/utils/token");

const addPost = async (req, res) => {
  try {
    console.log("addPost");
    const { content, imageUrl } = req.body;
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const userId = await decryptToken(token);
    const profile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });
    const newPost = await prisma.post.create({
      data: {
        content,
        imageUrl,
        profileId: profile.id,
      },
    });

    res.status(201).json({ newPost });
  } catch (error) {
    console.log("e", error);
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
};

module.exports = addPost;
