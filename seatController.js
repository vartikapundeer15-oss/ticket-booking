const { client } = require("./redisClient");

const TOTAL_SEATS = 10;

async function initializeSeats() {

    for (let i = 1; i <= TOTAL_SEATS; i++) {
        await client.set(`seat:${i}`, "available");
    }

    console.log("Seats initialized");
}

async function bookSeat(req, res) {

    const { seatNumber, user } = req.body;

    const seatKey = `seat:${seatNumber}`;

    const seatStatus = await client.get(seatKey);

    if (seatStatus === "booked") {
        return res.json({
            success: false,
            message: "Seat already booked"
        });
    }

    const locked = await client.set(`lock:${seatNumber}`, user, {
        NX: true,
        EX: 10
    });

    if (!locked) {
        return res.json({
            success: false,
            message: "Seat is being booked by another user"
        });
    }

    await client.set(seatKey, "booked");

    await client.del(`lock:${seatNumber}`);

    res.json({
        success: true,
        message: "Seat booked successfully"
    });
}

module.exports = { initializeSeats, bookSeat };