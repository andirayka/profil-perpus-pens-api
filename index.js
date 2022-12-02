const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const pool = require("./db");

const bookRoutes = require("./src/book/routes");

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

app.listen(port, () => console.log("listening on port " + port));
// pool.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("connected to db");
//   }
// });
