const express = require("express");
const router = express.Router();
const Blog = require("../model/blog");

//get all blogs
router.get("./all-blogs", async (req, res) => {
    try{
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch(error){
        res.status(500).json("Internal Server error");
    }
})

//create a new blog
router.post("./new-blog", async (req, res) => {
    try{
        const blog = await Blog.create(req.body);
        res.status(201).json(blog);
    } catch(error) {
        res.status(400).json("Invalid data");
    }
})





module.exports = router;
