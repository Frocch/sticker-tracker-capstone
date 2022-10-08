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
    serveLogin: (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/login/login.html'))
    },
    serveLoginCss: (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/login/styles.css'))
    },
    serveLoginJs: (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/login/login.js'))
    },
    
    serveMain: (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/main.html'))
    },
    serveMainCss: (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/main.css'))
    },
    serveMainJs: (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/main.js'))
    },

    login: (req, res) => {
        
        const { username, password } = req.body
        
        sequelize.query(`SELECT * FROM users
        WHERE username = '${username}';`)
        .then(dbRes => {
            const authenticated = bcrypt.hashSync(password, dbRes[0].pwdHash)
            
            if(authenticated) {
                let userToReturn = dbRes[0]
                delete userToReturn.pwdHash
                res.status(200).send(userToReturn)
                return
            } res.status(400).send()
        })
        .catch(err => console.log(err))
    },

    signup: (req, res) => {
        const { username, password } = req.body
        const salt = bcrypt.genSaltSync(5)
        const pwdHash = bcrypt.hashSync(password, salt)

        sequelize.query(`INSERT INTO users(username, pwdhash)
        VALUES ('${username}', '${pwdHash}')
        RETURNING user;
        `)
        .then(dbRes => {
            let userToReturn = dbRes[0]
            delete userToReturn.pwdhash
            res.status(200).send(userToReturn)
        })
        .catch(err => console.log(err))
    },

    getStickers: (req, res) => {
        sequelize.query(`SELECT stickers.name, stickers.country, countries.country_id, countries.country_name
        FROM stickers
        JOIN countries on countries.country_id = stickers.country
        ORDER BY countries.country_id;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    getUserStickers: (req, res)=> {
        const userId = req.params.userId
    }
}