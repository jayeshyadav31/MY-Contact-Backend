const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv=require("dotenv").config;
dotenv();
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    //console.log(process.env.ACCESS_TOKEN_SECRET);
    // console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
          if (err) {
              res.status(401);
              throw new Error("User is not authorized");
          }
          req.user = decoded.user;
          console.log("User:", req.user);
          next();
      });

    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
});

module.exports = validateToken;