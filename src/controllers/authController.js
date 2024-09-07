const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate fields
  if (!email?.trim() || !password?.trim()) {
    throw new ApiError(400, 'Email and password are required');
  }

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Check password using the model's method
  const match = await user.comparePassword(password);
  if (!match) {
    throw new ApiError(401, 'Invalid password');
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  // Send success response
  res
    .status(200)
    .json(
      ApiResponse.successResponse(
        { token, user: { id: user._id, name: user.name, email: user.email } },
        'Login successful',
        200,
      ),
    );
});

const registerController = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  //validations
  // Check all fields not empty
  if (!email?.trim() || !password?.trim() || !name?.trim()) {
    throw new ApiError(400, 'Email, password, and name are required');
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
