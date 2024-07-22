const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const JWT_SECRET="merhabaNodejs"

const login= async(req,res)=>{
    try {
        const { email, password } = req.body;
    
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return res.status(401).json({ error: "Geçersiz e-posta veya şifre." });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);   // kullanıcının şifresi ile girilen eşleşiyor mu?
        if (!isPasswordValid) {
          return res.status(401).json({ error: "Geçersiz e-posta veya şifre." });
        }
    
        // JWT oluştur
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: "1h",
        });
    
        res.json({ token });
      } catch (error) {
        console.log("e", error);
        res.status(500).json({ error: "Bir hata gerçekleşti." });
      }
}

module.exports=login;