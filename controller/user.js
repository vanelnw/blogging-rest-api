const express = require("express");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Access token
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

router.post("/register", catchAsyncErrors(async (req, res, next) => {
    try{
        const { username, password, email, fullName } = req.body;
        const userEmail = await User.findOne({ email });

        if(userEmail){
            return next(new ErrorHandler("User already exists", 400));
        }

        //create a new Author
        const newAuthor = await Author.create({ fullName, email });

        const user = await User.create({ username, password, email, author: newAuthor });

        sendToken(user, 201, res)

    } catch(error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));

// login user
router.post(
  "/login",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


module.exports = router;