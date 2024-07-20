//import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createPerson=async(req,res)=>{
    try {
      console.log("createPersons");
            const { email, name, age } = req.body;
            prisma.person
              .create({
                data: {
                  email,
                  age:Number(age),
                  name,
                },
              })
              .then((r) => {
                // dönen cevap
                res.status(201).json(r);
                console.log("r", r);
              })
              .catch((e) => {
                console.log("e", e);
              });
          } catch (error) {
            res.status(500).json({ error: "Bir hata gerçekleşti." });
          }
}

//export default createPerson;
module.exports = createPerson;


// router.post("/createPerson", async (req, res) => {
//   try {
//     const { email, name, age } = req.body;
//     prisma.person
//       .create({
//         data: {
//           email,
//           age,
//           name,
//         },
//       })
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
// });