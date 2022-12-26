const pool = require("../../db");
const { resFormat, slugify } = require("../helper");

const getBookByIdQuery = `SELECT * FROM books WHERE id=$1`;

const getBooks = (req, res) => {
  const keyword = req.query?.keyword?.toLowerCase();
  let query = "SELECT * FROM books";
  if (keyword) {
    query = `SELECT * from search_books('${keyword}')`;
  }
  pool.query(query, (err, result) => {
    if (err) res.send(err);
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
    if (err) res.send(err);
    if (!result.rows.length) {
      res.send("Buku tidak ada");
    }
    res.status(200).json(result.rows);
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
      if (err) res.send(err);
      else {
        res.status(200).send("Berhasil menambah buku");
      }
    }
  );
};

const updateBook = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, author, description, publisher, isbn, tags, slug, cover } =
    req.body;

  pool.query(getBookByIdQuery, [id], (err, result) => {
    const noBookFound = !result.rows.length;
    if (noBookFound) {
      res.send("Buku tidak ada");
    }

    pool.query(
      `UPDATE books SET
     title=$2, author=$3, description=$4, publisher=$5, isbn=$6, tags=$7, slug=$8, cover=$9
      WHERE id = $1`,
      [id, title, author, description, publisher, isbn, tags, slug, cover],
      (error) => {
        if (error) res.send(error);

        res.status(200).send("Berhasil mengubah data buku");
      }
    );
  });
};

const deleteBook = (req, res) => {
  const id = parseInt(req.params.id, 10);
  pool.query(getBookByIdQuery, [id], (err, result) => {
    const noBookFound = !result.rows.length;
    if (noBookFound) {
      res.send("Buku tidak ada");
    }

    pool.query(`DELETE FROM books WHERE id = $1`, [id], (error) => {
      if (error) res.send(error);

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
};
