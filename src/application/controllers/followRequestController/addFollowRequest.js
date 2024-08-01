const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const decryptToken = require("../../../../core/utils/token");

const addFollowRequest = async (req, res) => {
  try {
    console.log("addFollowRequest");
    const { receiverId } = req.body;
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const userId = await decryptToken(token);
    const profile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });
    const newFollowRequest = await prisma.FollowRequest.create({
      data: {
        senderId: profile.id,
        receiverId: Number(receiverId)
      },
    });

    res.status(201).json({ newFollowRequest });
  } catch (error) {
    console.log("e", error);
    res.status(500).json({ error: "İstek gönderilirken bir hata gerçekleşti." });
  }
};

module.exports = addFollowRequest;
