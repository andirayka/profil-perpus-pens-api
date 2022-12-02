const pool = require("../../db");

const getBookByIdQuery = `SELECT * FROM books WHERE id=$1`;

const getBooks = (req, res) => {
  pool.query("SELECT * FROM books", (err, result) => {
    if (err) res.send(err);
    res.status(200).json(result.rows);
  });
};

const getBookById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(getBookByIdQuery, [id], (err, result) => {
    if (err) res.send(err);
    if (!result.rows.length) {
      res.send("Buku tidak ada");
    }
    res.status(200).json(result.rows);
  });
};

const addBook = (req, res) => {
  const { name, author, description, publisher, isbn } = req.body;

  pool.query(
    `INSERT INTO books (name, author, description, publisher, isbn)
     VALUES ($1, $2, $3, $4, $5)`,
    [name, author, description, publisher, isbn],
    (err, result) => {
      if (err) res.send(err);
      else {
        res.status(200).send("Berhasil menambah buku");
      }
    }
  );
};

const updateBook = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, author, description, publisher, isbn } = req.body;

  pool.query(getBookByIdQuery, [id], (err, result) => {
    const noBookFound = !result.rows.length;
    if (noBookFound) {
      res.send("Buku tidak ada");
    }

    pool.query(
      `UPDATE books SET
     name=$2, author=$3, description=$4, publisher=$5, isbn=$6
      WHERE id = $1`,
      [id, name, author, description, publisher, isbn],
      (err, result) => {
        if (err) res.send(err);

        res.status(200).send("Berhasil mengubah data buku");
      }
    );
  });
};

const deleteBook = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(getBookByIdQuery, [id], (err, result) => {
    const noBookFound = !result.rows.length;
    if (noBookFound) {
      res.send("Buku tidak ada");
    }

    pool.query(`DELETE FROM books WHERE id = $1`, [id], (err, result) => {
      if (err) res.send(err);

      res.status(200).send("Berhasil menghapus buku");
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
