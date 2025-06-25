/* eslint-disable no-undef */
const config = {
    APP_SERVER_PORT: process.env.APP_SERVER_PORT || '3001',
    DB_PORT: process.env.DB_PORT || '3306',
    DB_HOST: process.env.DB_HOST || '324144122',
    DB_DATABASE: process.env.MYSQL_DATABASE || 'harmonize',
    DB_DIALECT: process.env.DB_DIALECT || 'B_DIALECT',
    DB_USERNAME: process.env.MYSQL_USER || 'B_USERNAME',
    DB_PASSWORD: process.env.MYSQL_PASSWORD || 'B_PASSWORD',
    JWT_SECRET: process.env.JWT_SECRET || 'ASJ38UDFN230923',
};
export = config;
