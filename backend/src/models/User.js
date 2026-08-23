const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },

    // Null when the account was created via GitHub OAuth only
    passwordHash: { type: String, default: null },

    // GitHub OAuth linkage
    githubId: { type: String, unique: true, sparse: true },
    githubUsername: { type: String },
    avatarUrl: { type: String },

    // Email verification (Phase 1: fixed OTP, real Gmail OTP later)
    isVerified: { type: Boolean, default: false },
    otpCode: { type: String, default: null },
    otpExpiresAt: { type: Date, default: null },

    plan: { type: String, default: 'Free Plan' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
