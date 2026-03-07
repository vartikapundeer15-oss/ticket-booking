const express = require("express");

const { connectRedis } = require("./redisClient");

const { initializeSeats } = require("./seatController");

const seatRoutes = require("./seatRoutes");

const app = express();

app.use(express.json());

const PORT = 3000;

app.use("/", seatRoutes);

async function startServer() {

    await connectRedis();

    await initializeSeats();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}

startServer();