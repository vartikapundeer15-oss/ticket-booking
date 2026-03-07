const express = require("express");
const { connectRedis } = require("./redisClient");
const { initializeSeats } = require("./seatController");
const seatRoutes = require("./seatRoutes");

const app = express();

app.use(express.json());

// homepage route
app.get("/", (req, res) => {
  res.send("Ticket Booking API Running");
});

// seat routes
app.use("/", seatRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await connectRedis();
    await initializeSeats();
  } catch (error) {
    console.log("Startup error:", error);
  }
});