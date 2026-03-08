const express = require("express");
const router = express.Router();

const { getSeats, bookSeat, resetSeats } = require("./seatController");

// get all seats
router.get("/", getSeats);

// book seat
router.post("/book", bookSeat);

// reset seats
router.post("/reset", resetSeats);

module.exports = router;