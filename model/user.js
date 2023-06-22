const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

userSchema.pre('save', function (next) {
    const user = this

    bcrypt.hash(user.password, 10, function (error, encrypted) {
        user.password = encrypted
        next()
    })
})

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);