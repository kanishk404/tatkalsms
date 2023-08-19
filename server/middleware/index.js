const jwt = require("jsonwebtoken");

require("dotenv").config();

const purchaseAuth = (req, res, next) => {

  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
    if (token) {
      try {
        let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.body.id = decodedToken.userId
        next();
      } catch (err) {
        res.status(403).send({ message: "Invalid Auth" });
      }
    } else {
      return res.status(502).send({ Message: "No Authorization Header" });
    }
  } else {
    return res.status(403).send("Issue in header");
  }
};

module.exports = purchaseAuth;