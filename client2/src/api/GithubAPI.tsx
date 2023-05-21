

const CLIENT_ID = 'f3acba1476f44f131be4';

export async function getCommitsHelper({user,owner,repoName}: {user: string, owner: string, repoName: string}): Promise<number> {
    return await fetch("http://localhost:4000/getCommits?user=" + user + "&owner=" + owner + "&repoName=" + repoName, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log("commitHelper:",data);
        console.log(data.length);
        return data.length;
    });
}


export async function getUserData() {
    const response = await fetch('http://localhost:4000/getUserData', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
    const data = await response.json();
    
    setUserDataGithub(data);
    return data;
}

export function isUserLoggedIn() {
    return localStorage.getItem('accessToken') !== null;
}

// export function getGithubUserName() {
//     if (!isUserLoggedIn()) {
//         return null;
//     }
//     return localStorage.getItem('githubUserName');
// }

// export function getScoreNowBitch({user}: {user: any}) {

//     const weights = {
//         followers: 0.4,
//         following: 0.2,
//         public_repos: 0.3,
//         time_created: 0.1
//       };
//     console.log("user: ",user);
//     // const { followers, following, public_repos, created_at } = user;
//     const followers = 0;
//     const following = user["following"];
//     const public_repos = user.public_repos;
//     const created_at = user.created_at;



//     const timeCreated = Date.now() - new Date(created_at).getTime();
//     const normalizedTimeCreated = timeCreated / (1000 * 60 * 60 * 24 * 365); // Convert milliseconds to years

//     const score =
//       (weights.followers * followers +
//         weights.following * following +
//         weights.public_repos * public_repos +
//         weights.time_created * normalizedTimeCreated) /
//       (weights.followers + weights.following + weights.public_repos + weights.time_created);
//     console.log("score: ",score);
//     return score.toFixed(2); // Round the score to two decimal places
// }

export function setUserDataGithub(data: any) {
    // if (!isUserLoggedIn()) {
    //     return null;
    // }

    return localStorage.setItem('userData', JSON.stringify(data));
}

export function getUserDataGithub() {
    if (!isUserLoggedIn()) {
        return null;
    }

    return JSON.parse(localStorage.getItem('userData')!);
}

  

export function loginWithGithub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
}