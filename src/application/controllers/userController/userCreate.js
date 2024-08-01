const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const JWT_SECRET="merhabaNodejs"


const userCreate = async (req, res) => {
  try {
    console.log("usercreate");
    const { username, fullName, email, password } = req.body;

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        fullName,
        email,
        password: hashedPassword,
      },
    });

    // JWT oluştur
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // user oluşunca profile oluşturma.
    const newProfile = await prisma.profile.create({
      data: {
        userId:newUser.id
      },
    });

    res.status(201).json({ token });
  } catch (error) {
    console.log("e", error);
    res.status(500).json({ error: "Bir hata gerçekleşti." });
  }
};

module.exports= userCreate






// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// const userCreate = async (req, res) => {
//   try {
//     console.log("user create");
//     const { username, fullName, email, password } = req.body;
//     prisma.User.create({
//       data: {
//         username,
//         fullName,
//         email,
//         password,
//       },
//     })
//       .then((r) => {
//         // dönen cevap
//         res.status(201).json(r);
//         console.log("r", r);
//       })
//       .catch((e) => {
//         console.log("e", e);
//       });
//   } catch (error) {
//     res.status(500).json({ error: "Bir hata gerçekleşti." });
//   }
// };

// module.exports = userCreate;


// // await ile 
// /*
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// const userCreate = async (req, res) => {
//   try {
//     console.log("user create");
//     const { username, fullName, email, password } = req.body;

//     const newUser = await prisma.user.create({
//       data: {
//         username,
//         fullName,
//         email,
//         password,
//       },
//     });

//     res.status(201).json(newUser);
//     console.log("r", newUser);
//   } catch (error) {
//     console.log("e", error);
//     res.status(500).json({ error: "Bir hata gerçekleşti." });
//   }
// };

// module.exports = userCreate;


// */