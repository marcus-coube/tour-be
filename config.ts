/* eslint-disable no-undef */
const config = {
    APP_SERVER_PORT: process.env.APP_SERVER_PORT || '',
    DB_PORT: process.env.DB_PORT || '',
    DB_HOST: process.env.DB_HOST || '',
    DB_DATABASE: process.env.MYSQL_DATABASE || '',
    DB_DIALECT: process.env.DB_DIALECT || '',
    DB_USERNAME: process.env.MYSQL_USER || '',
    DB_PASSWORD: process.env.MYSQL_PASSWORD || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
};
export = config;
