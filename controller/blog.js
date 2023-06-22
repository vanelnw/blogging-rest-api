const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const Blog = require("../model/blog");
const Comment = require("../model/comment");
const { isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: API endpoints for blogs
 */

/**
 * @swagger
 * /api/v1/blogs/all:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Returns an array of blogs
 *       500:
 *         description: Internal server error
 */

router.get("/all", async(req, res) => {
  try{
    const blogs = await Blog.find();
    res.json(blogs);
  } catch(error) {
    return new ErrorHandler(error, 500) ;
  } 
})

//create a blog

/**
 * @swagger
 * /api/v1/blogs/new:
 *   post:
 *     summary: Create a blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   author:
 *                     type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the created comment
 *       400:
 *         description: Bad request
 */

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

/**
 * @swagger
 * /api/v1/blogs/{blogId}/comments:
 *   post:
 *     summary: Add a comment to a blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog to add the comment to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the created comment
 *       400:
 *         description: Bad request or blog not found
 */

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

/**
 * @swagger
 * /api/v1/blogs/{blogId}/comments:
 *   get:
 *     summary: Get all comments of a blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog to retrieve comments from
 *     responses:
 *       200:
 *         description: Returns an array of comments
 *       400:
 *         description: Bad request or blog not found
 *       500:
 *         description: Internal server error
 */

router.get("/:blogId/comments", 
catchAsyncErrors(async (req, res, next) => {
    try{
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId);

        if(!blog){
           return next(new ErrorHandler("Blog not found", 400));
        }

        const comments = Comment.find({blog: blogId});
        res.status(200).json(comments);
    } catch(error) {
       return next(new ErrorHandler(error, 500)) ;
    }
}));

//Like a blog

/**
 * @swagger
 * /api/v1/blogs/{blogId}/like:
 *   put:
 *     summary: Like a blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog to like
 *     responses:
 *       200:
 *         description: Blog liked successfully
 *       400:
 *         description: Bad request or blog not found
 *       500:
 *         description: Internal server error
 */
router.put("/:blogId/like", 
catchAsyncErrors(async (req, res, next) => {
    try{
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId);

        if(!blog){
           return next(new ErrorHandler("Blog not found", 400));
        }

        blog.likes += 1;

        await blog.save();

        res.status(200).json("Blog liked successfully");
    } catch(error) {
       return next(new ErrorHandler(error, 500)) ;
    }
}));

//view a blog

/**
 * @swagger
 * /api/v1/blogs/{blogId}/view:
 *   put:
 *     summary: Add a view to a blog
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog to add a view
 *     responses:
 *       200:
 *         description: View added to the blog successfully
 *       400:
 *         description: Bad request or blog not found
 *       500:
 *         description: Internal server error
 */
router.put("/:blogId/view", 
catchAsyncErrors(async (req, res, next) => {
    try{
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId);

        if(!blog){
           return next(new ErrorHandler("Blog not found", 400));
        }

        blog.views += 1;

        await blog.save();

        res.status(200).json("view added to a Blog successfully");
    } catch(error) {
       return next(new ErrorHandler("Internal server error", 500));
    }
}));

module.exports = router;
