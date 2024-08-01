const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const decryptToken = require("../../../../core/utils/token");

const updateFollowRequest = async (req, res) => {
  try {
    console.log("updateFollowRequest");
    const { status , senderId} = req.body;
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const userId = await decryptToken(token);
    const profile = await prisma.profile.findUnique({
        where:{
            userId:userId,
        }
    })
    const updateFollowRequest = await prisma.followRequest.update({
      where: {
        senderId_receiverId: {
          senderId: senderId,      // istek atan kişi
          receiverId: profile.id,
        }
      },
      data: {
        status:status
      },
    });
    if(status=="ACCEPTED"){
      const newFollow= await prisma.follow.create({
        data:{
          
        followerId: senderId,
        followingId: profile.id,
        }
      })
    }

    res.status(201).json({ updateFollowRequest });
  } catch (error) {
    console.log("e", error);
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
};

module.exports = updateFollowRequest;
