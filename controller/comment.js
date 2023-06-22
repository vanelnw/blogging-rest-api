const express = require("express");
const router = express.Router();
const Comment = require("../model/comment");

//get all comments of a blog
router.get("./blogs/:blogId/comments", async (req, res) => {
    try{
        const {blogId} = req.params;
        const comments = Comment.find({blog: blogId});
        res.status(200).json(comments);
    } catch(error) {
        res.status(500).json("Internal server error");
    }
})

//create comment
router.post("./blogs/:blogId/comments", async (res, req) => {
    try{
        const {blogId} = req.params;
        const blog = await Blog.find(blogId);

        if(!blog){
           return res.status(400).json({error: "Blog not found"});
        }

        const comment = await Comment.create(req.body);
        res.status(200).json(comment);
    } catch(error) {
        res.status(400).json("Invalid data")
    }
})

module.exports = router;
