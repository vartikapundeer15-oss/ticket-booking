const express = require("express");
const router = express.Router();

const { getSeats, bookSeats, resetSeats } = require("./seatController");

// get all seats
router.get("/", getSeats);

// book seats
router.post("/book", bookSeats);

// reset seats
router.post("/reset", resetSeats);

module.exports = router;