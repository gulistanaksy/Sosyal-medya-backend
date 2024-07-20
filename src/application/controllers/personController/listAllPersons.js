//import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const listAllPersons =async(req ,res)=>{
    console.log("listallpersons");
    try {
      console.log("listAllPersons");
      const r = await prisma.person.findMany({
        select: {
          age: true,
          id: true,
          name: true,
        },
      });
      res.status(200).json(r);
      console.log(r);
    } catch (error) {
      res.status(500).json({ error: "Bir hata gerçekleşti." });
    }
}
//export default listAllPersons;
module.exports = listAllPersons;



// router.get("/listAllPersons", async (req, res) => {
//     console.log("listallpersons");
//     try {
//       const r = await prisma.person.findMany({
//         select: {
//           age: true,
//           id: true,
//           name: true,
//         },
//       });
//       res.status(200).json(r);
//       console.log(r);
//     } catch (error) {
//       res.status(500).json({ error: "Bir hata gerçekleşti." });
//     }
//   });
