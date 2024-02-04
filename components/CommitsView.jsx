import React, { useEffect, useState } from "react";
import wrapper from '@components/css/Wrapper.module.css';
import style from '@components/css/CommitsView.module.css';
import { Octokit } from "octokit";


const CommitsView = () => {

    const [isLoading, setIsLoading]     = useState(null);
    const [error, setError]             = useState(null);
    const [commits, setCommits]         = useState(
        {
            SCHPY: [],
            SCHJS: [],
            SCHSH: [],
            SCHCF: [],
        }
    );

    useEffect(
        () => {

            const octokit = new Octokit(
                { 
                    auth: import.meta.env.VITE_GITHUB_API_TOKEN,
                }
            );

            const fetchAllCommits = async () => {
                try {

                    const responses = await Promise.all([
                        octokit.request('GET /repos/rhman-ibrahim/sch-py/commits'),
                        octokit.request('GET /repos/rhman-ibrahim/sch-js/commits'),
                        octokit.request('GET /repos/rhman-ibrahim/sch-sh/commits'),
                        octokit.request('GET /repos/rhman-ibrahim/sch-cf/commits')
                    ]);

                    responses.map(
                        (response, index) => {
                        if (response.status === 200) {
                            setCommits(
                                prevState => (
                                    {
                                        ...prevState,
                                        [Object.keys(commits)[index]]: response.data
                                    }
                                )
                            );
                        } else {
                            setError(`Error fetching commits for repository ${Object.keys(commits)[index]}`);
                        }
                    });

                } catch (error) {
                    setError('Error fetching commits');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchAllCommits();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
//
    return (
        <div id={ style.repositoriesWrapper } className={ wrapper.defaultWrapper }>
            <div id={ style.commitsInfo }>
                <h2>Commits</h2>
            </div>
            {
                Object.entries(commits).map(
                    ([repo, commits]) => (
                        <div key={repo} className={ style.commitsWrapper }>
                            {
                                commits.map(
                                    commit => (
                                        <ul key={commit.sha}>
                                            <li>{ repo }</li>
                                            <li>{commit.commit.message}</li>
                                            <li>{commit.commit.author.date}</li>
                                        </ul>
                                    )
                                )
                            }
                        </div>
                    )
                )
            }
        </div>
    );
};

export default CommitsView;

//