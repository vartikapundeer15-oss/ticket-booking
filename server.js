const express = require("express");
const { connectRedis } = require("./redisClient");
const { initializeSeats } = require("./seatController");
const seatRoutes = require("./seatRoutes");

const app = express();

app.use(express.json());
app.use("/", seatRoutes);

// Render requires dynamic port
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {

        // Start server first so Render detects port
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        // Then connect Redis
        await connectRedis();
        await initializeSeats();

    } catch (error) {
        console.error("Startup error:", error);
    }
}

startServer();