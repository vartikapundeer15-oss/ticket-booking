const express = require("express");
const router = express.Router();

const { bookSeat, getSeats } = require("./seatController");

router.get("/seats", getSeats);
router.post("/book", bookSeat);

module.exports = router;