import React, { useEffect, useState } from "react";
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

            const octokit = new Octokit({ 
                auth: import.meta.env.VITE_GITHUB_API_TOKEN,
            });

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

    return (
        <div>
            <h1>Commits</h1>
            <div>
                {Object.entries(commits).map(([repo, commits]) => (
                    <div key={repo}>
                        <h2>{repo}</h2>
                        <ul>
                            {commits.map(commit => (
                                <li key={commit.sha}>{commit.commit.message}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommitsView;