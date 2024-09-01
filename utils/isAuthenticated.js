function isAuthenticated(req, res, next) {
  return !!req.session.userId;
}

export default isAuthenticated;