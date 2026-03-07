const express = require("express");
const { connectRedis } = require("./redisClient");
const { initializeSeats } = require("./seatController");
const seatRoutes = require("./seatRoutes");

const app = express();

app.use(express.json());
app.use("/", seatRoutes);

// Render gives a port automatically
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Ticket Booking API Running");
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await connectRedis();
    await initializeSeats();
  } catch (error) {
    console.error("Startup error:", error);
  }
});