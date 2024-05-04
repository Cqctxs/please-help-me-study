const express = require("express");
const router = express.Router();
const gradeController = require("../../controllers/gradeController");

router.post("/", gradeController.grade);

module.exports = router;
