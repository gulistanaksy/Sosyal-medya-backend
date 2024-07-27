const jwt = require("jsonwebtoken");
const JWT_SECRET = "merhabaNodejs";


const decryptToken = async (token) => {
    try {
        console.log("Token açma işlemi");
        console.log(token);

        // Token'i doğrulayıp çözme işlemi
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded", decoded);

        // Token içindeki kullanıcı ID'si
        const userId = decoded.userId;

        return userId;
    } catch (error) {
        console.error("Token çözme hatası: ", error);
        throw new Error("Geçersiz veya süresi dolmuş token");
    }
}

module.exports = decryptToken ;
