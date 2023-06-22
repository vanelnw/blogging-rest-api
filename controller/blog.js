const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const Blog = require("../model/blog");
const Comment = require("../model/comment");
const { isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


//get all blogs
router.get("/all", async(req, res) => {
  try{
    const blogs = await Blog.find();
    res.json(blogs);
  } catch(error) {
    return new ErrorHandler(error, 500) ;
  } 
})

//create a blog
router.post("/new", 
isAuthenticated,
catchAsyncErrors(async (req, res, next) => {
    try{
        const { user, title, content } = req.body;
        const comment = await Comment.create({
            title,
            content,
            author: user.author._id
        });
        res.status(200).json(comment);
    } catch(error) {
       return next(new ErrorHandler(error, 400)) ;
    }
}

));


//add comment to a blog
router.post("/:blogId/comments", 
isAuthenticated,
catchAsyncErrors(async (req, res, next) => {
    try{
        const {blogId} = req.params;
        const blog = await Blog.find(blogId);

        if(!blog){
           return next(new ErrorHandler("Blog not found", 400));
        }
        const { user, content } = req.body;
        const comment = await Comment.create({
            content,
            user: user._id,
            blog: blogId
        });
        res.status(200).json(comment);
    } catch(error) {
       return next(new ErrorHandler(error, 400)) ;
    }
}

));

//get all comments of a blog
router.get("./blogs/:blogId/comments", 
catchAsyncErrors(async (req, res, next) => {
    try{
        const {blogId} = req.params;
        const comments = Comment.find({blog: blogId});
        res.status(200).json(comments);
    } catch(error) {
       return next(new ErrorHandler(error, 500)) ;
    }
}));

module.exports = router;
