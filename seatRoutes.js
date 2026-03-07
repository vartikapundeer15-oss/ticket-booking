const express = require("express");
const router = express.Router();

const { getSeats, bookSeat } = require("./seatController");

router.get("/seats", getSeats);
router.post("/book", bookSeat);

module.exports = router;