import { Sequelize } from 'sequelize';
require('dotenv').config()

/**
* Utilizzo del design pattern "Singleton" per poter creare una singola 
* connessione al database grazie alla libreria "sequelize"
**/


export class PostgresSingleton {
    private static instance: PostgresSingleton;
    private connection: Sequelize;
    
    private constructor() {
        this.connection = new Sequelize (process.env.POSTGRES_DATABASE!, process.env.POSTGRES_USER!, process.env.POSTGRES_PASSWORD, {
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            dialect: 'postgres'
        });
    }

    public static getConnection(): Sequelize {
        if (!PostgresSingleton.instance) {
            this.instance = new PostgresSingleton();
        }
        return PostgresSingleton.instance.connection;
    }
}