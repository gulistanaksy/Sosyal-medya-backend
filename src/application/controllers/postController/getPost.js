const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const decryptToken = require("../../../../core/utils/token");

const getPost = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Yetkilendirme tokeni eksik." });
    }

    const userId = await decryptToken(token);

    if (!userId) {
      return res.status(401).json({ error: "Geçersiz token." });
    }

    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({ error: "Post ID eksik." });
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profil bulunamadı." });
    }

    const post = await prisma.post.findUnique({
      where: {
        profileId: profile.id,
        id: Number(postId),
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post bulunamadı." });
    }

    res.status(200).json({ post });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
};

module.exports = getPost;

// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// const decryptToken = require("../../../../core/utils/token");

// const getPost = async (req, res) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     const userId = await decryptToken(token);
//     const {postId} = req.body;

//     const profile = await prisma.profile.findUnique({
//         where: {
//           userId: userId,
//         },
//       });

//     const post = await prisma.post.findUnique({
//       where: {
//         profileId_postId: {
//             profileId: profile.id,
//             postId: Number(postId), // postId'yi integer yap
//           },
//       },
//     });

//     if (!post) {
//         return res.status(404).json({ error: "Post bulunamadı." });
//       }

//       res.status(200).json({ post });
//   } catch (error) {
//     res.status(500).json({ error: "Bir hata gerçekleşti." });
//   }
// };

// module.exports = getPost;
