"use strict";
exports.__esModule = true;
exports.PostgresSingleton = void 0;
var sequelize_1 = require("sequelize");
require('dotenv').config();
/**
* Utilizzo del design pattern "Singleton" per poter creare una singola
* connessione al database grazie alla libreria "sequelize"
**/
var PostgresSingleton = /** @class */ (function () {
    function PostgresSingleton() {
        this.connection = new sequelize_1.Sequelize(process.env.POSTGRES_DATABASE, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            dialect: 'postgres'
        });
    }
    PostgresSingleton.getConnection = function () {
        if (!PostgresSingleton.instance) {
            this.instance = new PostgresSingleton();
        }
        return PostgresSingleton.instance.connection;
    };
    return PostgresSingleton;
}());
exports.PostgresSingleton = PostgresSingleton;
