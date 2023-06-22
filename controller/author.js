const express = require("express");
const router = express.Router();
const Author = require("../model/author");
const ErrorHandler = require("../utils/ErrorHandler");

//get authors
router.get("/all-authors", async(req, res) => {
  try{
    const authors = await Author.find();
    res.json(authors);
  } catch(error) {
    return new ErrorHandler(error, 500) ;
  } 
})

//create a new author
router.post('/new-author', async(req,res)=>{
    try{
        const author = await Author.create(req.body);
        res.status(201).json(author);
    }catch(error){
        return new ErrorHandler(error, 400) ;
    }
});

module.exports = router;
