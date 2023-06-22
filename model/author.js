const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, "Please enter your name"],
    },
    email:{
        type: String,
        required:[true,"please provide an e-mail address"],
        unique: true,
    }
});

module.exports = mongoose.model("Author", authorSchema);
