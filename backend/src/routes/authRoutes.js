const express = require('express');
const passport = require('passport');
const router = express.Router();

const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');
const { signToken } = require('../utils/token');

// Email/password
router.post('/register', authController.register);
router.post('/verify-otp', authController.verifyOtp);
router.post('/resend-otp', authController.resendOtp);
router.post('/login', authController.login);
router.get('/me', requireAuth, authController.me);

// GitHub OAuth
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email', 'repo'], session: false })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: `${process.env.CLIENT_URL}/login?error=github` }),
  (req, res) => {
    // req.user was set by the GitHub strategy's verify callback
    const token = signToken(req.user);
    // Hand the token back to the frontend via a redirect with a query param.
    // The frontend reads this once and stores it (e.g. in memory/localStorage).
    res.redirect(`${process.env.CLIENT_URL}/oauth/callback?token=${token}`);
  }
);

module.exports = router;
