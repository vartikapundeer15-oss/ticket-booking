const { createClient } = require("redis");

let redisClient;

async function connectRedis() {
  redisClient = createClient({
    url: process.env.REDIS_URL || "redis://127.0.0.1:6379"
  });

  redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
  });

  await redisClient.connect();

  console.log("Redis connected successfully");
}

function getRedisClient() {
  return redisClient;
}

module.exports = { connectRedis, getRedisClient };