const jwt = require("jsonwebtoken");
const pool = require("../../db");

const login = (req, res) => {
  const { username, password } = req.body;
  // const user = { username, password };

  // jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  pool.query(``, [username, password], (err) => {
    if (err) res.send(err);
    else {
      res.status(200).send("Berhasil login");
    }
  });
};

module.exports = {
  login,
};
