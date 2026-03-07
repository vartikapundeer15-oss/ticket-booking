const express = require("express");

const { connectRedis } = require("./redisClient");
const { initializeSeats } = require("./seatController");
const seatRoutes = require("./seatRoutes");

const app = express();

app.use(express.json());

// Render requires dynamic port
const PORT = process.env.PORT || 3000;

app.use("/", seatRoutes);

async function startServer() {
    try {
        await connectRedis();
        await initializeSeats();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();