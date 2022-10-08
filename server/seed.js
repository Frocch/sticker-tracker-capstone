require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        DROP TABLE if EXISTS user_album;
        DROP TABLE if EXISTS users;
        DROP TABLE if EXISTS stickers;
        DROP TABLE if EXISTS countries;

        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(40),
            pwdhash VARCHAR(255)
        );

        CREATE TABLE countries (
            country_id SERIAL PRIMARY KEY,
            country_name VARCHAR(50)
        );

        CREATE TABLE stickers (
            sticker_id SERIAL PRIMARY KEY,
            sticker_number VARCHAR(10),
            name VARCHAR(50),
            country INTEGER REFERENCES countries(country_id)
        );

        CREATE TABLE user_album (
            user_album_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            sticker_id INTEGER REFERENCES stickers(sticker_id)
        );

        INSERT INTO countries (country_name)
        VALUES ('Argentina');

        INSERT INTO stickers (sticker_number, name, country)
        VALUES ('ARG1', 'Emblem', 1),
        ('ARG2', 'Emiliano Martinez', 1),
        ('ARG3', 'Franco Armani', 1),
        ('ARG4', 'Marcos Acuña', 1),
        ('ARG5', 'Nahuel Molina', 1),
        ('ARG6', 'Nicolas Otamendi', 1),
        ('ARG7', 'German Pezzella', 1),
        ('ARG8', 'Cristian Romero', 1),
        ('ARG9', 'Rodrigo De Paul', 1),
        ('ARG10', 'Angel Di Maria', 1),
        ('ARG11', 'Giovani Lo Celso', 1),
        ('ARG12', 'Leandro Paredes', 1),
        ('ARG13', 'Guido Rodriguez', 1),
        ('ARG14', 'Julian Alvarez', 1),
        ('ARG15', 'Joaquin Correa', 1),
        ('ARG16', 'Alejandro Gomez', 1),
        ('ARG17', 'Nicolas Gonzales', 1),
        ('ARG18', 'Lautaro Martinez', 1),
        ('ARG19', 'Lionel Messi', 1);

    `).then(() => {
        console.log('DB Seeded!')
    }).catch(err => console.log('error seeding DB', err))
    }
};