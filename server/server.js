require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require("path");
const app = express();
const { seed } = require('./seed.js');
const { login,
        signup,
        serveLogin, 
        serveLoginCss, 
        serveLoginJs, 
        serveMain, 
        serveMainCss, 
        serveMainJs,
        getStickers,
        addSticker,
        getUserAlbum
     } = require('./ctrl/controller.js');

app.use(express.json());
app.use(cors());

//DEV
app.post('/seed', seed)

//PUBLIC - USER LOGIN/SIGNUP
app.get('/', serveLogin)
app.get('/logincss', serveLoginCss)
app.get('/loginjs', serveLoginJs)
app.post('/users/login', login)
app.post('/users/signup', signup)


// PUBLIC - MAIN PAGE
app.get('/main', serveMain,)
app.get('/maincss', serveMainCss)
app.get('/mainjs', serveMainJs)
app.get('/stickers', getStickers)
app.post('/userstickers', addSticker)
app.get(`/useralbum/:userid`, getUserAlbum)

//PORT
const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Up on port ${port}`));