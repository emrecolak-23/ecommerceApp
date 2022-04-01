// Import Packages
const express = require("express");
const jwt = require("jsonwebtoken");

// Import Controller
const user = require("../controllers/AuthController");

// Validations
const validate = require("../middlewares/validate");
// Validation middleware
const schemas = require("../validations/User");

// Declare Router
const router = express.Router();

// register
router.post('/register',validate(schemas.registerValidation) ,user.register);
// login
router.post('/login', validate(schemas.loginValidation) ,user.login);

// user authorization
router.get('/me', (req,res)=>{
  const {authorization} = req.headers;
  const [, token] = authorization.split(" ");
  const decode = jwt.verify(token, process.env.ACCESS_TOKEN);

  if (decode) {
    res.json({
      decode
    })
  } else {
    res.status(400).json({
      message: "unauthorized"
    })
  }
})

// Export Router
module.exports = router