const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const decryptToken = require("../../../../core/utils/token");

const updatePost = async (req, res) => {
  try {
    console.log("updatePost");
    const { content, imageUrl, id } = req.body;
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const userId = await decryptToken(token);
    const profile = await prisma.profile.findUnique({
        where:{
            userId:userId,
        }
    })
    const updatePost = await prisma.post.update({
      where: {
        profileId:profile.id,
        id:Number(id)
      },
      data: {
        content,
        imageUrl,
      },
    });

    res.status(201).json({ updatePost });
  } catch (error) {
    console.log("e", error);
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
};

module.exports = updatePost;
