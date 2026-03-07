const { createClient } = require("redis");

let client;

async function connectRedis() {

    const redisUrl = process.env.REDIS_URL;

    if (!redisUrl) {
        console.log("REDIS_URL not found. Using local Redis...");
    }

    client = createClient({
        url: redisUrl || "redis://127.0.0.1:6379"
    });

    client.on("error", (err) => {
        console.error("Redis Error:", err);
    });

    await client.connect();

    console.log("Redis connected successfully");
}

function getRedisClient() {
    return client;
}

module.exports = { connectRedis, getRedisClient };