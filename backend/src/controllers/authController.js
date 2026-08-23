const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signToken } = require('../utils/token');

// POST /api/auth/register
async function register(req, res) {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Full name, email and password are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Phase 1: OTP is fixed to DEV_FIXED_OTP so the flow can be tested
    // without wiring up real Gmail sending yet.
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      passwordHash,
      otpCode: process.env.DEV_FIXED_OTP || '1111',
      otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
      isVerified: false,
    });

    res.status(201).json({
      message: 'Account created. Enter the verification code to continue.',
      email: user.email,
      // Dev-only hint so the frontend can display it during testing.
      devOtpHint: process.env.NODE_ENV !== 'production' ? user.otpCode : undefined,
    });
  } catch (err) {
    console.error('[auth] register error:', err);
    res.status(500).json({ message: 'Something went wrong creating your account' });
  }
}

// POST /api/auth/verify-otp
async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: 'No account found for this email' });
    }
    if (user.isVerified) {
      return res.status(200).json({ message: 'Already verified' });
    }

    const fixedOtp = process.env.DEV_FIXED_OTP || '1111';
    const isValid = otp === fixedOtp || otp === user.otpCode;

    if (!isValid) {
      return res.status(400).json({ message: 'Incorrect code' });
    }
    if (user.otpExpiresAt && user.otpExpiresAt < new Date() && otp !== fixedOtp) {
      return res.status(400).json({ message: 'Code expired, please request a new one' });
    }

    user.isVerified = true;
    user.otpCode = null;
    user.otpExpiresAt = null;
    await user.save();

    const token = signToken(user);
    res.json({
      message: 'Email verified',
      token,
      user: publicUser(user),
    });
  } catch (err) {
    console.error('[auth] verify-otp error:', err);
    res.status(500).json({ message: 'Something went wrong verifying the code' });
  }
}

// POST /api/auth/resend-otp
async function resendOtp(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });
    if (!user) return res.status(404).json({ message: 'No account found for this email' });

    user.otpCode = process.env.DEV_FIXED_OTP || '1111';
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    res.json({
      message: 'Code resent',
      devOtpHint: process.env.NODE_ENV !== 'production' ? user.otpCode : undefined,
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong resending the code' });
  }
}

// POST /api/auth/login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });

    if (!user || !user.passwordHash) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email first', requiresVerification: true, email: user.email });
    }

    const token = signToken(user);
    res.json({ message: 'Logged in', token, user: publicUser(user) });
  } catch (err) {
    console.error('[auth] login error:', err);
    res.status(500).json({ message: 'Something went wrong logging in' });
  }
}

// GET /api/auth/me
async function me(req, res) {
  res.json({ user: publicUser(req.user) });
}

function publicUser(user) {
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    avatarUrl: user.avatarUrl,
    plan: user.plan,
    githubUsername: user.githubUsername,
    isVerified: user.isVerified,
  };
}

module.exports = { register, verifyOtp, resendOtp, login, me, publicUser };
