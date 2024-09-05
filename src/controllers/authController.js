const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { haspassword, comparePassword } = require('../helper/authHelper');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(404).send({
        success: false,
        message: 'invalid email and password',
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'user not found',
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: 'password is invaild',
      });
    }
    const options = {
      expiresIn: '1h',
    };
    const token = await jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      options,
    );

    res.status(200).send({
      success: true,
      message: 'login seccessfully',
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status('500').send({
      success: false,
      masage: 'error in login',
      error,
    });
  }
};

const registerController = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  //validations
  // Check all fields not empty
  if ([email, password, name].some((fields) => fields?.trim === '')) {
    throw new ApiError(400, 'All fields are required');
  }

  //checkuser
  const existingUser = await User.findOne({ email });

  //existing user
  if (existingUser) {
    throw new ApiError(409, 'User with email or username already exists');
  }

  // Create new user
  const user = new User({ name, email, password });
  await user.save();

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res
    .status(201)
    .json(
      ApiResponse.successResponse(
        { token, user: { id: user._id, name, email } },
        'User registered successfully',
        201,
      ),
    );
});

module.exports = { loginController, registerController };
