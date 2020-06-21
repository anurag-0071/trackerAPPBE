
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const _USERNAME = "username";
const _PASSWORD = "password";

const generateJWTToken = (user) => {
  const token = jwt.sign(user, "TRACKERAPP_SECRET", { expiresIn: "1h" });
  return token;
}

const validateLogin = (username, password) => {
  return (username === _USERNAME && password === _PASSWORD)
}

const login = async (req, res) => {
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  if (validateLogin(username, password)) {
    const token = generateJWTToken({ username, password });
    res.send(Object.assign({}, { username, token }));
  } else {
    res.status(400).send({
      message: "Invalid Login!!",
    });
  }
}

const verifyJWTToken = async (req, res, next) => {
  console.log("req.url", req.url)
  if (req.url === '/users/login') {
    next();
  } else {
    try {
      const token = req.headers.authorization;
      console.log("Token", token)
      const userInfo = jwt.verify(token, "TRACKERAPP_SECRET");
      req.userInfo = userInfo;
      console.log("user info", userInfo);
      next();
    } catch (error) {
      console.error("Invalid token");
      res.status(401).send({
        message: "Unauthorized"
      })
    }
  }
}

module.exports = {
  login,
  verifyJWTToken,
}