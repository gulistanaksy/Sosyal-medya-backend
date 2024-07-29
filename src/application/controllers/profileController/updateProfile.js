const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const decryptToken = require("../../../../core/utils/token");

const updateProfile = async (req, res) => {
  try {
    console.log("updateProfile");
    const { bio, profilePicture, isPrivate } = req.body;
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const userId = await decryptToken(token);
    const updateProfile = await prisma.profile.update({
      where: {
        userId:userId,
      },
      data: {
        bio,
        profilePicture,
        isPrivate,
      },
    });

    res.status(201).json({ updateProfile });
  } catch (error) {
    console.log("e", error);
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
};

module.exports = updateProfile;
