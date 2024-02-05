import React, { useEffect, useState } from "react";
import wrapper from '@components/css/Wrapper.module.css';
import style from '@components/css/CommitsView.module.css';
import { Octokit } from "octokit";

const CommitsView = () => {

    const [isLoading, setIsLoading]     = useState(null);
    const [error, setError]             = useState(null);
    const [history, setHistory]         = useState([]);
    const [commits, setCommits]         = useState(
        {
            'sch-py': [],
            'sch-js': [],
            'sch-sh': [],
            'sch-cf': []
        }
    );
    const about = {
        'sch-py': {icon:'fa-brands fa-python'},
        'sch-js': {icon:'fa-brands fa-js'},
        'sch-sh': {icon:'fa-solid fa-terminal'},
        'sch-cf': {icon:'fa-solid fa-gears'}
    }

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

    useEffect(
        () => {
            const combined = [];
            Object.entries(commits).forEach(([repo, commitsArray]) => {
                commitsArray.forEach(commit => {
                    combined.push(
                        {
                            repository: repo,
                            message:    commit.commit.message,
                            date:       commit.commit.author.date,
                            id:         commit.sha
                        }
                    );
                });
            });
            setHistory(combined.sort((a, b) => new Date(b.date) - new Date(a.date)));
        },[commits]
    )

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
                <h2>
                    <i className="fa-brands fa-github"></i>
                    <span>Commits</span>
                </h2>
            </div>
            <div id={ style.commitsWrapper }>
                {
                    history.map(
                        commit => (
                            <ul key={commit.id}>
                                <li className={ about[commit.repository].icon }></li>
                                <li>{commit.message}</li>
                                <li>{Math.round(((Date.now() - new Date(commit.date)) / 86_400_000))} days ago</li>
                            </ul>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default CommitsView;

//