import dotenv from 'dotenv';
dotenv.config();

export const config = {
    database: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    server: {
        port: Number(process.env.PORT)
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    google: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI
    }
}