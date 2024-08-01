const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const decryptToken = require("../../../../core/utils/token");


// gelen istekleri listelemek içindir.
const getFollowRequest = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Yetkilendirme tokeni eksik." });
    }

    const userId = await decryptToken(token);

    if (!userId) {
      return res.status(401).json({ error: "Geçersiz token." });
    }


    const profile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profil bulunamadı." });
    }
    
    // beklemede olan istekler
    const gelenIstekler = await prisma.followRequest.findMany({
      where: {
        receiverId:profile.id,
        status: "PENDING"
      },
      include:{
        sender:true
      }
    });

    if (!gelenIstekler) {
      return res.status(404).json({ error: "İstek bulunamadı." });
    }

    res.status(200).json({ gelenIstekler });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
};

module.exports = getFollowRequest;

