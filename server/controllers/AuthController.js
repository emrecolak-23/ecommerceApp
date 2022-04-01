// Import Packages
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
// Import Prisma Client
const { PrismaClient } = require('@prisma/client');
// Create Prisma Client
const prisma = new PrismaClient();

class authController {
  static register = async (req, res, next) => {
      try {
        const data = req.body;
        // Hashing user password
        bcrypt.hash(data.password, 10, async function(err,hash){
            if(err) throw err
            data.password = hash
            // Create User and Add Into Database with Hashed Password
            await prisma.user.create({
                data: data
            })
            res.status(201).json({data});
        });
      }
      catch (e) {
          next(e)
      }
  }
  static login = async (req, res, next) => {
       try {
          const data = req.body;
          const { email, password } = data;
          const user = await prisma.user.findUnique({
                where: {
                    email
                }
            });
            if (!user) {
                throw "ErrorMessage"
            }
            if(user) {
            // Control Entered User Password and Database Password 
            bcrypt.compare(password, user.password, (err,same)=>{
              if(same){
                // Generate User Token
                const token = jwt.sign(user, process.env.ACCESS_TOKEN);
                res.status(200).json({ user: user, token: token});
              } else {
                res.status(400).json({message: "Enter right password"})
              }
            })
           }
          
      } catch (e) {
        res.status(400).json({message: "Something went wrong",e});
      }
  }


}
module.exports = authController;