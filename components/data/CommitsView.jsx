import React, { useEffect, useState } from "react";
import wrappers from '@components/css/Wrapper.module.css';
import style from '@components/css/CommitsView.module.css';
import { Octokit } from "octokit";
import { motion } from 'framer-motion';


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
        'sch-py': {icon:'fa-brands fa-python', color:'#00b0ff'},
        'sch-js': {icon:'fa-brands fa-js', color:'#ffea00'},
        'sch-sh': {icon:'fa-solid fa-cube', color:'#76ff03'},
        'sch-cf': {icon:'fa-solid fa-file-code', color:'#d500f9'}
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
        <section id={ style.repositoriesWrapper } data-section="commits">
            <div className={ wrappers.infoDivWrapper }>
                <h1>
                    <i className="fa-brands fa-github"></i>
                    <i className="fa-solid fa-code-commit"></i>
                </h1>
                <h2>
                    <span>{ history.length } Commits.</span>
                </h2>
                <p>A commit is a fundamental action that records changes to a repository's files. This project consists of { Object.keys(commits).length > 1 ? `${Object.keys(commits).length} repositories`:'1 repository' }.
                Commits are ordered by time of creation.</p>
            </div>
            <div id={ style.commitsWrapper }>
                {
                    history.map(
                        commit => (
                            <motion.ul key={commit.id} whileHover={{ background:about[commit.repository].color }}>
                                <li className={ about[commit.repository].icon }></li>
                                <li>{commit.message}</li>
                                <li>{Math.round(((Date.now() - new Date(commit.date)) / 86_400_000))} days ago</li>
                            </motion.ul>
                        )
                    )
                }
            </div>
        </section>
    );
};

export default CommitsView;

//