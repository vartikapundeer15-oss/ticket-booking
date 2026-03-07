const { getRedisClient } = require("./redisClient");

async function initializeSeats() {
  const client = getRedisClient();

  if (!client) {
    console.log("Redis client not initialized");
    return;
  }

  for (let i = 1; i <= 10; i++) {
    await client.set(`seat:${i}`, "available");
  }

  console.log("Seats initialized");
}

async function bookSeat(req, res) {
  const client = getRedisClient();
  const { seatNumber } = req.body;

  const seatKey = `seat:${seatNumber}`;

  const status = await client.get(seatKey);

  if (status === "booked") {
    return res.json({ message: "Seat already booked" });
  }

  await client.set(seatKey, "booked");

  res.json({ message: `Seat ${seatNumber} booked successfully` });
}

async function getSeats(req, res) {
  const client = getRedisClient();

  const seats = {};

  for (let i = 1; i <= 10; i++) {
    seats[`seat:${i}`] = await client.get(`seat:${i}`);
  }

  res.json(seats);
}

module.exports = { initializeSeats, bookSeat, getSeats };