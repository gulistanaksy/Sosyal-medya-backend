const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const decryptToken = require("../../../../core/utils/token")

const getProfile = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const userId = await decryptToken(token)
    const profile = await prisma.profile.findUnique({
      where: {
        id: Number(userId), // ID'nin integer olduğundan emin olun
      },
      select: {
        id: true,
        bio:true,
        profilePicture:true,
        isPrivate:true,
        userId:true,
        user:true,
        posts:true
      },
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
};
module.exports = getProfile;
