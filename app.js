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
const author = require("./controller/author")
const blog = require("./controller/blog");
const comment = require("./controller/comment");

app.use("/api/v1/authors", author);
app.use("/api/v1/blogs", blog);
app.use("/api/v1/comment", comment);

//ErrorHandling
app.use(ErrorHandler);

module.exports = app;
