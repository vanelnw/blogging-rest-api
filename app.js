const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");

app.use(express.json());

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "config/.env",
    })
}

//import routes
const user = require("./controller/user");
const author = require("./controller/author")
const blog = require("./controller/blog");

app.use("/api/v1/auth", user);
app.use("/api/v1/authors", author);
app.use("/api/v1/blogs", blog);

//ErrorHandling
app.use(ErrorHandler);

module.exports = app;
