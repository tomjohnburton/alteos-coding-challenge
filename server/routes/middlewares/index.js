//! Simple middleware to confirm a user is logged in to apply to the REST requests
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next();
  else next({ status: 403, message: "Please login." });
}

module.exports = {
  isLoggedIn
};
