require('dotenv').config();

module.exports = {
    // Config PORT
    PORT: process.env.PORT,
    // COnfig Database
    DB_HOST: process.env.DB_HOST,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASS: process.env.DB_PASS,
    DATABASE: process.env.DATABASE,
    DATE: process.env.DATE

}