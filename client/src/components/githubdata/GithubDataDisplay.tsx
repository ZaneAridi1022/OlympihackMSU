import styles from './GithubDataDisplay.module.scss';

import {useState,useEffect} from 'react';

function GithubDataDisplay({user}: {user: string}) {
    const [commitData, setCommitData] = useState([{repoName:'',
                                                    commits:0,
                                                    stars:0
                                                }]);

    useEffect(() => {
        getCommitHistory({user});
    },[user])

    async function getCommitsHelper({user,owner,repoName}: {user: string, owner: string, repoName: string}): Promise<number> {
        return await fetch("http://localhost:4000/getCommits?user=" + user + "&owner=" + owner + "&repoName=" + repoName, {
            method: "GET"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("commitHelper:",data);
            console.log(data.length);
            return data.length;
        });
    }

    async function getCommitHistory({user}: {user: string}) {
        await fetch("http://localhost:4000/getRepos?user="+user, {
            method: "GET"
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            //setCommitData(data);
            var max1 = -1;
            var max1name = '';
            var max1owner = '';
            var max2 = -1;
            var max2name = '';
            var max2owner = '';
            var max3 = -1;
            var max3name = '';
            var max3owner = '';

            data.map((repo: {stargazers_count:0,name:'',owner:{login:''}}) => {
                if (repo["stargazers_count"] > max1)
                {
                    max1 = repo["stargazers_count"];
                    max1name = repo["name"];
                    max1owner = repo["owner"]["login"];
                }
                else if (repo["stargazers_count"] > max2)
                {
                    max2 = repo["stargazers_count"];
                    max2name = repo["name"];
                    max2owner = repo["owner"]["login"];
                }
                else if (repo["stargazers_count"] > max3)
                {
                    max3 = repo["stargazers_count"];
                    max3name = repo["name"];
                    max3owner = repo["owner"]["login"];
                }
            })

            Promise.all([
                            getCommitsHelper({ user: user, owner: max1owner, repoName: max1name }),
                            getCommitsHelper({ user: user, owner: max2owner, repoName: max2name }),
                            getCommitsHelper({ user: user, owner: max3owner, repoName: max3name })
                        ])
                        .then((commitNums) => {
                            const [num1, num2, num3] = commitNums;

                            setCommitData([
                            {
                                repoName: max1name,
                                commits: num1,
                                stars: max1
                            },
                            {
                                repoName: max2name,
                                commits: num2,
                                stars: max2
                            },
                            {
                                repoName: max3name,
                                commits: num3,
                                stars: max3
                            }
                            ]);
                            
                        })
        })
        
    }

    const RepoDisplay = ({repoName,stars,commits}: {repoName: string, stars: number, commits: number}) => {
        return (
            <>
                <h3>{repoName}</h3>
                <p>This repo has {stars} stars</p>
                <p>The user contributed through {commits} commits</p>
                <br/>
            </>
        )
    }

    const RepoDisplayList = commitData.map((repo) => 
        <RepoDisplay repoName={repo.repoName} stars={repo.stars} commits={repo.commits}/>
    );

    return (
        <>
        <div className={styles.githubDisplayContainer}>
            <p>This user's top 3 repositories are:</p>
            {RepoDisplayList}
        </div>
        </>
    )
}

export default GithubDataDisplay;