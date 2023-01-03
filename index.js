const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const pool = require("./db");

const bookRoutes = require("./src/book/routes");
const authRoutes = require("./src/auth/routes");

const app = express();

// app.use(bodyParser.json());
// app.get("/", (req, res) => {
//   pool.query("SELECT * FROM books", (err, result) => {
//     if (err) throw err;
//     res.status(200).json(result.rows);
//   });
// });
app.use(express.json());
app.use(cors());
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);

app.listen(process.env.PGPORT, () =>
  // eslint-disable-next-line no-console
  console.log(`Sedang listening on port ${process.env.PGPORT}`)
);
// pool.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("connected to db");
//   }
// });
