const pool = require("../../db");
const { resFormat, slugify } = require("../helper");

const getBookByIdQuery = `SELECT * FROM books WHERE id=$1`;

const getBooks = (req, res) => {
  const keyword = req.query?.keyword?.toLowerCase();
  let query = "SELECT * FROM books";
  if (keyword) {
    query = `SELECT * from books WHERE title LIKE %${keyword}%`;
    // query = `SELECT * from search_books('${keyword}')`;
  }
  pool.query(query, (err, result) => {
    if (err) {
      resFormat({
        res,
        message: "Ambil data buku gagal",
        data: [],
      });
    } else {
      resFormat({
        res,
        message: "Ambil data buku berhasil",
        data: result.rows,
      });
    }
  });
};

const getExactBook = (req, res) => {
  const { keyword } = req.params;
  // console.log(keyword);

  pool.query(`SELECT * from books`, (err, result) => {
    if (err) res.send({ data: [] });
    resFormat({
      res,
      message: "Ambil data buku berhasil",
      data: result.rows,
    });
  });
};

const getBookById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  pool.query(getBookByIdQuery, [id], (err, result) => {
    if (err)
      resFormat({
        res,
        message: "Ambil detail buku gagal",
        data: [],
      });
    if (!result.rows.length) {
      resFormat({
        res,
        message: "Buku tidak ada",
        data: [],
      });
      // res.send("Buku tidak ada");
    }
    resFormat({
      res,
      message: "Ambil detail buku berhasil",
      data: result.rows,
    });
    // res.status(200).json(result.rows);
  });
};

const addBook = (req, res) => {
  const { title, author, description, publisher, isbn, tags, cover } = req.body;
  const slug = slugify(title);

  pool.query(
    `INSERT INTO books (title, author, description, publisher, isbn, tags, slug, cover)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [title, author, description, publisher, isbn, tags, slug, cover],
    (err) => {
      if (err) {
        resFormat({
          res,
          message: "Gagal menambah buku",
        });
      } else {
        resFormat({
          res,
          message: "Berhasil menambah buku",
        });
      }
    }
  );
};

const updateBook = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, author, description, publisher, isbn, tags, cover } = req.body;
  const slug = slugify(title);

  pool.query(getBookByIdQuery, [id], (err, result) => {
    const noBookFound = !result.rows.length;
    if (noBookFound) {
      resFormat({
        res,
        message: "Buku tidak ada",
        data: [],
      });
    }

    pool.query(
      `UPDATE books SET
     title=$2, author=$3, description=$4, publisher=$5, isbn=$6, tags=$7, slug=$8, cover=$9
      WHERE id = $1`,
      [id, title, author, description, publisher, isbn, tags, slug, cover],
      (error) => {
        if (error) {
          resFormat({
            res,
            message: "Gagal mengubah data buku",
            data: [],
          });
        }
        resFormat({
          res,
          message: "Berhasil mengubah data buku",
          data: [],
        });
      }
    );
  });
};

const deleteBook = (req, res) => {
  const id = parseInt(req.params.id, 10);
  pool.query(getBookByIdQuery, [id], (err, result) => {
    const noBookFound = !result.rows.length;
    if (noBookFound) {
      resFormat({
        res,
        message: "Buku tidak ada",
        data: [],
      });
    }

    pool.query(`DELETE FROM books WHERE id = $1`, [id], (error) => {
      if (error) {
        resFormat({
          res,
          message: "Gagal menghapus buku",
        });
      }

      resFormat({
        res,
        message: "Berhasil menghapus buku",
      });
    });
  });
};

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  getExactBook,
};
