const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email', 'repo'], // 'repo' is needed later for pushing generated code
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          const email =
            profile.emails && profile.emails[0]
              ? profile.emails[0].value
              : `${profile.username}@users.noreply.github.com`;

          // If an account with this email already exists (e.g. registered
          // via email/password), link the GitHub identity to it instead
          // of creating a duplicate account.
          user = await User.findOne({ email: email.toLowerCase() });

          if (user) {
            user.githubId = profile.id;
            user.githubUsername = profile.username;
            user.avatarUrl = profile.photos?.[0]?.value;
          } else {
            user = new User({
              fullName: profile.displayName || profile.username,
              email: email.toLowerCase(),
              githubId: profile.id,
              githubUsername: profile.username,
              avatarUrl: profile.photos?.[0]?.value,
              isVerified: true, // GitHub already verified their identity
            });
          }
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
