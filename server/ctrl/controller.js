require("dotenv").config();
const bcrypt = require('bcryptjs');
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");
const path = require('path')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    login: (req, res) => {

        const { username, password } = req.body

        sequelize.query(`SELECT * FROM users
        WHERE username = "${username}";`)
        .then(dbRes => {
            const authenticated = bcrypt.hashSync(password, dbRes[0].pwdHash)

            if(authenticated) {
                let userToReturn = dbRes[0]
                delete userToReturn.pwdHash
                res.status(200).send(userToReturn)
                return
            } res.status(400).send()
        })
        .catch(err => res.status(400).send(err))
    },

    signup: (req, res) => {
        const { username, password } = req.body
        const salt = bcrypt.genSaltSync(5)
        const pwdHash = bcrypt.hashSync(password, salt)

        sequelize.query(`INSERT INTO users (username, pwdhash)
        VALUES ("${username}", "${pwdHash}")
        RETURNING *;`)
        .then(dbRes => {
            let userToReturn = dbRes[0]
            delete userToReturn.pwdhash
            res.status(200).send(userToReturn)

        })
        .catch(err => res.status(400).send(err))
    },

    // allTeams: (req, res) => {
    //     sequelize.query(`SELECT * FROM countries;`)
    //     .then(dbRes => res.status(200).send(dbRes[0]))
    // },

    serveLogin: (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/login/login.html'))
    },
    serveLoginCss: (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/login/styles.css'))
    },
    serveLoginJs: (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/login/login.js'))
    }
}