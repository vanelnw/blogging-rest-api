const express = require("express");
const router = express.Router();
const Blog = require("../model/blog");
const ErrorHandler = require("../utils/ErrorHandler");

//get all blogs
router.get("./all-blogs", async (req, res) => {
    try{
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch(error){
        return new ErrorHandler(error, 500) ;
    }
})

//create a new blog
router.post("./new-blog", async (req, res) => {
    try{
        const blog = await Blog.create(req.body);
        res.status(201).json(blog);
    } catch(error) {
        return new ErrorHandler(error, 400) ;
    }
})





module.exports = router;
