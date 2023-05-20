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
    request.get("Authorization");
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

app.get('/commits/:username', async (req, res) => {
    const username = req.params.username;
  
    try {
      // Fetch user repositories
      const repoResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
      const repos = repoResponse.data;
  
      // Fetch commits for each repository
      const commitPromises = repos.map(async (repo) => {
        const commitsResponse = await axios.get(`https://api.github.com/repos/${username}/${repo.name}/commits`);
        return commitsResponse.data;
      });
  
      // Wait for all commit requests to finish
      const commits = await Promise.all(commitPromises);
  
      // Flatten the array of commits
      const flattenedCommits = commits.flat();
  
      res.json(flattenedCommits);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving commits');
    }
  });
  


app.listen(4000, function () {
    console.log("CORS server running on port 4000");
})