require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require("path");
const app = express();
const { seed } = require('./seed.js');
const { login,
        signup, 
        allTeams, 
        serveLogin, 
        serveLoginCss, 
        serveLoginJs, 
        serveMain, 
        serveMainCss, 
        serveMainJs,
        getStickers } = require('./ctrl/controller.js');

const { sign } = require('crypto');
const { get } = require('http');

app.use(express.json());
app.use(cors());

//DEV
app.post('/seed', seed)

//PUBLIC
app.get('/', serveLogin)
app.get('/logincss', serveLoginCss)
app.get('/loginjs', serveLoginJs)
app.post('/users/login', login)
app.post('/users/signup', signup)

app.get('/main', serveMain,)
app.get('/stickers', getStickers)
app.get('/maincss', serveMainCss)
app.get('/mainjs', serveMainJs)



const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Up on port ${port}`));