require("dotenv").config();
const bcrypt = require('bcryptjs');
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");
const path = require('path');
const { send } = require("process");

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
        RETURNING *;
        `)
        .then(dbRes => {
            let userToReturn = dbRes[0]
            delete userToReturn.pwdhash
            res.status(200).send(userToReturn)
        })
        .catch(err => res.status(400).send(err))
    },

    getStickers: (req, res) => {
        sequelize.query(`SELECT stickers.name, stickers.sticker_number, sticker_id, stickers.country, countries.country_id, countries.country_name
        FROM stickers
        JOIN countries on countries.country_id = stickers.country
        ORDER BY countries.country_id;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    addSticker: (req, res) => {
        const userId = req.body.userId
        const stickerId = req.body.stickerId

        sequelize.query(`INSERT INTO user_album (user_id, sticker_id)
        VALUES ('${userId}', '${stickerId}');`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => res.status(400).send(err))
    },

    getUserAlbum: (req, res)=> {
        const userId = req.params.userid
        sequelize.query(`SELECT stickers.sticker_id, stickers.sticker_number, stickers.name, stickers.country, user_album.sticker_id, user_album.user_id, countries.country_id, countries.country_name
        FROM stickers
        JOIN user_album ON stickers.sticker_id = user_album.sticker_id
        JOIN countries ON stickers.country = countries.country_id
        WHERE user_album.user_id = ${userId}; `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }

}
