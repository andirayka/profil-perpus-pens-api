const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getBooks);
router.get("/:id", controller.getBookById);
router.post("/", controller.addBook);
router.put("/:id", controller.updateBook);
router.delete("/:id", controller.deleteBook);

module.exports = router;
