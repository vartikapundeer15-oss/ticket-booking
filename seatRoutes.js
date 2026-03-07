const express = require("express");

const router = express.Router();

const { bookSeat } = require("./seatController");

router.post("/book", bookSeat);

module.exports = router;