import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import TOKEN_DETAILS from '../config/index.js';


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  shop: {
    type: String,
    default: '',
  },
  access_token: {
    type: String,
    default: '',
  },
});

// secruring the password with bcrypt
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = 10;
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateAccessToken = function () {
  // 'this' refers to the current user document
  const payload = {
    userId: this._id.toString(),
  };

  const token = jwt.sign(payload, TOKEN_DETAILS.JWT_SECRET_KEY, {
    expiresIn: TOKEN_DETAILS.ACCESS_TOKEN_EXPIRATION_TIME,
  });
  return token;
};

userSchema.methods.generateRefreshToken = function () {
  // 'this' refers to the current user document
  const payload = {
    userId: this._id.toString(),
  };

  const refreshToken = jwt.sign(payload, TOKEN_DETAILS.REFRESH_SECRET_KEY, {
    expiresIn: TOKEN_DETAILS.REFRESH_TOKEN_EXPIRATION_TIME,
  });

  return refreshToken;
};

const User = mongoose.model("User", userSchema);

export default User
