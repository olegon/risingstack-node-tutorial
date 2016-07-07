module.exports = {
    redisStore: {
        url: process.env.REDIS_STORE_URI,
        secret: process.env.REDIS_STORE_SECRET || 'ABC123'
    }
}
