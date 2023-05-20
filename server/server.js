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

// user code being passed from the frontend
app.get('/getAccessToken', async function(request, response){
    console.log(request.query.code);

    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + request.query.code;

    await fetch("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        response.json(data);
    })
});

// getUserData
// access token is going to be passed in as an Authoirization header
app.get('/getUserData', async function(request, response){
    console.log(request.get("Authorization"));
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization" : request.get("Authorization")
        }
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        response.json(data);
    })
})

// Get commits from every repo
app.get('/getCommits', async function(request, response){
    console.log(request.get("Authorization"));
    await fetch("https://api.github.com/users/" + request.query.user + "/repos?per_page=100&type=all", {
        method: "GET",
        headers: {
            "Authorization" : request.get("Authorization"),
            "Accept": "application/json"
        }
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        response.json(data);
    })
})

app.listen(4000, function () {
    console.log("CORS server running on port 4000");
})