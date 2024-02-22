const authenticationMiddleware = (req, res, next) => {
  // Check if the user is authenticated
  if (!req.session.userName) {
    return res.redirect("/404"); // Redirect to login page if not authenticated
  }

  // Pass control to the next middleware or route handler
  next();
};

export default authenticationMiddleware;
