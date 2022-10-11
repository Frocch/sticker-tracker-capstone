require("dotenv").config();
const { DATABASE_URL } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_URL, {
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
        VALUES ('Argentina'),
        ('Brazil'),
        ('Belgium'),
        ('France'),
        ('England');

        INSERT INTO stickers (sticker_number, name, country)
        VALUES ('ARG1', 'Argentina Emblem', 1),
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
        ('ARG19', 'Lionel Messi', 1),
        ('BRA1', 'Brazil Emblem', 2),
        ('BRA2', 'Alisson', 2),
        ('BRA3', 'Ederson', 2),
        ('BRA4', 'Alex Sandro', 2),
        ('BRA5', 'Danilo', 2),
        ('BRA6', 'Eder Militao', 2),
        ('BRA7', 'Marquinhos', 2),
        ('BRA8', 'Thiago Silva', 2),
        ('BRA9', 'Casemiro', 2),
        ('BRA10', 'Philippe Coutinho', 2),
        ('BRA11', 'Fabinho', 2),
        ('BRA12', 'Fred', 2),
        ('BRA13', 'Lucas Paqueta', 2),
        ('BRA14', 'Antony', 2),
        ('BRA15', 'Gabriel Jesus', 2),
        ('BRA16', 'Neymar Jr', 2),
        ('BRA17', 'Raphinha', 2),
        ('BRA18', 'Richarlison', 2),
        ('BRA19', 'Vinicius Jr', 2),
        ('BEL1', 'Belgium Emblem', 3),
        ('BEL2', 'Thiabut Courtois', 3),
        ('BEL3', 'Simon Mignolet', 3),
        ('BEL4', 'Toby Alderweireld', 3),
        ('BEL5', 'Timothy Castagne', 3),
        ('BEL6', 'Jason Denayer', 3),
        ('BEL7', 'Thomas Meunier', 3),
        ('BEL8', 'Jan Vertonghen', 3),
        ('BEL9', 'Yannick Carrasco', 3),
        ('BEL10', 'Kevin De Bruyne', 3),
        ('BEL11', 'Charles De Ketelaere', 3),
        ('BEL12', 'Thorgan Hazard', 3),
        ('BEL13', 'Youri Tielemans', 3),
        ('BEL14', 'Hans Vanaken', 3),
        ('BEL15', 'Alex Witsel', 3),
        ('BEL16', 'Jeremy Doku', 3),
        ('BEL17', 'Eden Hazard', 3),
        ('BEL18', 'Romelu Lukaku', 3),
        ('BEL19', 'Dries Mertens', 3),
        ('FRA1', 'France Emblem', 4),
        ('FRA2', 'Hugo Lloris', 4),
        ('FRA3', 'Mike Maignan', 4),
        ('FRA4', 'Lucas Hernandez', 4),
        ('FRA5', 'Theo Hernandez', 4),
        ('FRA6', 'Presnel Kimpembe', 4),
        ('FRA7', 'Jules Kounde', 4),
        ('FRA8', 'Benjamin Pavard', 4),
        ('FRA9', 'Raphael Varane', 4),
        ('FRA10', 'NGolo Kante', 4),
        ('FRA11', 'Paul Pogba', 4),
        ('FRA12', 'Adrien Rabiot', 4),
        ('FRA13', 'Aurelien Tchouameni', 4),
        ('FRA14', 'Wissam Ben Yedder', 4),
        ('FRA15', 'Karim Benzema', 4),
        ('FRA16', 'Kingsey Coman', 4),
        ('FRA17', 'Antoine Griezmann', 4),
        ('FRA18', 'Kylian Mbappe', 4),
        ('FRA19', 'Christopher Nkunku', 4),
        ('ENG1', 'England Emblem', 5),
        ('ENG2', 'Jordan Pickford', 5),
        ('ENG3', 'Aaron Ramsdale', 5),
        ('ENG4', 'Trent Alexander-Arnold', 5),
        ('ENG5', 'Conor Coady', 5),
        ('ENG6', 'Harry Maguire', 5),
        ('ENG7', 'Luke Shaw', 5),
        ('ENG8', 'John Stones', 5),
        ('ENG9', 'Kyle Walker', 5),
        ('ENG10', 'Jude Bellingham', 5),
        ('ENG11', 'Jack Grealish', 5),
        ('ENG12', 'Jordan Henderson', 5),
        ('ENG13', 'Mason Mount', 5),
        ('ENG14', 'Kalvin Phillips', 5),
        ('ENG15', 'Declan Rice', 5),
        ('ENG16', 'Phil Foden', 5),
        ('ENG17', 'Harry Kane', 5),
        ('ENG18', 'Bukayo Saka', 5),
        ('ENG19', 'Raheem Sterling', 5);
        

    `).then(() => {
        console.log('DB Seeded!')
    }).catch(err => console.log('error seeding DB', err))
    }
};