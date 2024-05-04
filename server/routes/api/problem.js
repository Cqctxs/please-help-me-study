const express = require("express");
const router = express.Router();
const problemController = require("../../controllers/problemController");

router.post("/generate", problemController.generate);
router.post("/answer", problemController.answer);

module.exports = router;
