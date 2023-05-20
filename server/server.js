var express = require('express');
var cors = require('cors');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser = require('body-parser');

const CLIENT_ID = "f3acba1476f44f131be4";
const CLIENT_SECRET = "aa19d35309e03fefc0ee385961f402668c98bef1";

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(4000, function () {
    console.log("CORS server running on port 4000");
})