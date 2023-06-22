const express = require("express");
const router = express.Router();
const Author = require("../model/author");

//get authors
router.get("/all-authors", async(req, res) => {
  try{
    const authors = await Author.find();
    res.json(authors);
  } catch(error) {
    res.status(500).json({error: "internat server error"})
  } 
})

//create a new author
router.post('/new-author', async(req,res)=>{
    try{
        const author = await Author.create(req.body);
        res.status(201).json(author);
    }catch(error){
        res.status(400).json({error: "invalid data"})
    }
});

module.exports = router;
