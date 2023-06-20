import "dotenv/config";

const config = {
    mongo: {
        CONNECTION_STRING: process.env.DATABASE_URL
    },
    paypal: {
        CLIENT_ID: process.env.CLIENT_ID,
        SECRETS: process.env.APP_SECRET
    }
}

export default config;