const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
   blog:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
   },

   user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
    },

    content:{
        type: String,
        required : true
    },

});

module.exports = mongoose.model("Comment", commentSchema);