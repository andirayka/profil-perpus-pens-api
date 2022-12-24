const { Router } = require("express");
const multer = require("multer");
const controller = require("./controller");

const router = Router();

const multerStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `./images/`);
  },
  filename(req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const filename = `Halo-${Date.now()}.${ext}`;
    req.body.image = filename;
    req.body.images = [];
    cb(null, filename);
  },
});

const multerFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  }

  return cb(null, true);
};
const upload = multer({
  storage: multerStorage,
  //   fileFilter: multerFilter,
  //   limits: { fileSize: 1024 * 1024 * 5, files: 1 },
});

router.get("/", controller.getBooks);
router.post(
  "/coba",
  (req, res, next) => {
    return upload.single("file")(req, res, () => {
      next();
    });
  },
  (req, res) => {
    try {
      return res.status(200).json({
        message: "Berhasil upload ke server",
        req: req.body,
      });
    } catch (e) {
      return res
        .status(500)
        .json({ e, message: "Error saat upload ke server" });
    }
  }
);
router.get("/:id", controller.getBookById);
router.post("/", controller.addBook);
router.put("/:id", controller.updateBook);
router.delete("/:id", controller.deleteBook);

module.exports = router;
