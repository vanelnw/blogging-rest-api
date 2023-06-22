const express = require("express");
const router = express.Router();
const Comment = require("../model/comment");
const ErrorHandler = require("../utils/ErrorHandler");

//get all comments of a blog
router.get("./blogs/:blogId/comments", async (req, res) => {
    try{
        const {blogId} = req.params;
        const comments = Comment.find({blog: blogId});
        res.status(200).json(comments);
    } catch(error) {
       return new ErrorHandler(error, 500) ;
    }
})

//create comment
router.post("./blogs/:blogId/comments", async (res, req) => {
    try{
        const {blogId} = req.params;
        const blog = await Blog.find(blogId);

        if(!blog){
           return new ErrorHandler("Blog not found", 400);
        }

        const comment = await Comment.create(req.body);
        res.status(200).json(comment);
    } catch(error) {
       return new ErrorHandler(error, 400) ;
    }
})

module.exports = router;
