const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.session.token;

  if (!token) {
    console.log("Invalid token: " + req.body.token);
    return res.status(403).render("index");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    console.error(err);
    return res.status(401).render("index");
  }
  return next();
};

module.exports = verifyToken;
