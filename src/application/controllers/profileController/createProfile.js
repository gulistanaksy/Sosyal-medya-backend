const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const decryptToken = require("../../../../core/utils/token");

const createProfile = async (req, res) => {
  try {
    console.log("createProfile");
    const { bio, profilePicture, isPrivate } = req.body;
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const userId = await decryptToken(token)
    const newProfile = await prisma.profile.create({
      data: {
        bio,
        profilePicture,
        isPrivate,
        userId:userId
      },
    });

    res.status(201).json({ newProfile });
  } catch (error) {
    console.log("e", error);
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
};

module.exports= createProfile;

