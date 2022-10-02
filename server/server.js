require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require("path");
const app = express();
const { SERVER_PORT } = process.env;
const { seed } = require('./seed.js');
// const { --, --, -- } = require('./controller.js')

app.use(express.json());
app.use(cors());

//DEV
//app.post('/seed', seed)

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../login/login.html"))
});

// const port = process.env.PORT || 5050;

app.listen(SERVER_PORT, () => console.log(`Up on port ${SERVER_PORT}`));