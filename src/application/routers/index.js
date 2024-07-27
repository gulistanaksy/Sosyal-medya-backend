const express = require("express");
const UserController = require("../controllers/userController");
const userController = new UserController();
//import personRouter from './personRouter'
const personRouter = require("./personRouter");
const userRouter = require("./userRouter");
const profileRouter = require("./profileRouter");
const postRouter = require("./postRouter");

const login = require("../controllers/userController/login");
const router = express.Router();
const JWT_SECRET = "merhabaNodejs";
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/register", userController.userCreate);
router.post("/login", userController.login);

//const isPasswordValid = await bcrypt.compare(password, user.password);
router.use(async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Erişim reddedildi." });
  }

  try {
    console.log("token açma");
    console.log(token);
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("decoded", decoded);
    req.userId = decoded.userId; // Token içindeki kullanıcı ID'sini req nesnesine ekle
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
router.use("/person/", personRouter);
router.use("/user/", userRouter);
router.use("/profile/", profileRouter);
router.use("/post",postRouter)

//export default router ;
module.exports = router;
