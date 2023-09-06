const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = require("../models/User");

// Bearer space aega nhi toh token keliye jgh nhi hoga yh syntax mai hai
exports.authorization = async (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorisation").replace("Bearer ", "");

    // if token is missing
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is missing",
      });
    }

    // token is verify
    // /secret key ke adhat pr

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // decode payload hai jo hmne login ke time kiya tha

      // login vale part vala code jb hmne payload dalatha ab autherization mai akr verify kr rhe hai

      // payload idhr decode hai payload bhi likh skte hai
      // const payload = {
      //     email: existingUser.email,
      //     id: existingUser._id,
      //   };

      //   if (await bcrypt.compare(password, existingUser.password)) {
      //     //    password correct hogya toh login krege
      //     // create kro token
      //     let token = jwt.sign(payload, process.env.JWT_SECRET, {
      //       expiresIn: "2h",
      //     });

      // decode mai id and email hai jo hmne payload mai dala tha
        // maine payload mai id paas kr rhki hai toh authorization mai decode mai id mil jati hai toh usse mai user ko fetch kr skta hu
        // isilye req.user.id mai id hoti hai 
        // decode means payload
        // jo hmne payload mai dala tha vo decode mai hai
        // email and id
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying token",
    });
  }
};
