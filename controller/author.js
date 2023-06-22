const express = require("express");
const router = express.Router();
const Author = require("../model/author");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//get authors
router.get("/all", catchAsyncErrors(async (req, res, next) => {
  try{
    const authors = await Author.find();
    res.json(authors);
  } catch(error) {
    return next(new ErrorHandler(error, 500));
  } 
}));

module.exports = router;
