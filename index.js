const express = require("express");
require("dotenv").config();
// const pool = require("./db");

const bookRoutes = require("./src/book/routes");
const authRoutes = require("./src/auth/routes");

const app = express();
const port = process.env.PORT;

// app.use(bodyParser.json());
// app.get("/", (req, res) => {
//   pool.query("SELECT * FROM books", (err, result) => {
//     if (err) throw err;
//     res.status(200).json(result.rows);
//   });
// });
app.use(express.json());
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`listening on port ${port}`));
// pool.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("connected to db");
//   }
// });
