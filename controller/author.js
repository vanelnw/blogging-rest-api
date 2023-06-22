const express = require("express");
const router = express.Router();
const Author = require("../model/author");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//get authors

/**
 * @swagger
 * /api/v1/authors/all:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *       500:
 *         description: Internal Server Error
 */
router.get("/all", catchAsyncErrors(async (req, res, next) => {
  try{
    const authors = await Author.find();
    res.json(authors);
  } catch(error) {
    return next(new ErrorHandler(error, 500));
  } 
}));

module.exports = router;
