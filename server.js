const express=require('express')
const app=express()
const dotenv=require("dotenv").config
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler.js");
const port = process.env.PORT || 5000;
connectDb();
dotenv();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});