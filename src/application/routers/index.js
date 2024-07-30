const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = "merhabaNodejs";
const jwt = require("jsonwebtoken");

const UserController = require("../controllers/userController");
const userController = new UserController();

const userRouter = require("./userRouter");
const profileRouter = require("./profileRouter");
const postRouter = require("./postRouter");
const commentRouter = require("./commentRouter");
const likeRouter = require("./likeRouter");

const decryptToken = require("../../../core/utils/token")


router.post("/register", userController.userCreate);
router.post("/login", userController.login);

router.use(async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Erişim reddedildi." });
  }

  try {
    req.userId =await decryptToken(token); // Token içindeki kullanıcı ID'sini req nesnesine ekle
    console.log(req.userId);
    // Kullanıcının veritabanında mevcut olup olmadığını kontrol et

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!user) {
      return res.status(401).json({ error: "Geçersiz kullanıcı." });
    }
    console.log(user);
    // Kullanıcı geçerli ise devam et
    next();
  } catch (error) {
    res.status(401).json({ error: "Geçersiz token." });
  }
});

router.get("/", (req, res) => {
  res.send("merhaba");
});

router.use("/user/", userRouter);
router.use("/profile/", profileRouter);
router.use("/post",postRouter);
router.use("/comment",commentRouter);
router.use("/like", likeRouter);


module.exports = router;
