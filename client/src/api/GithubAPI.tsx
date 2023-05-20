

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
    return data;
}

export function isUserLoggedIn() {
    return localStorage.getItem('accessToken') !== null;
}
  

export function loginWithGithub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
}