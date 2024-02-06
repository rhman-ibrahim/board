import React, { useEffect, useState, useRef } from "react";
import style from '@components/data/css/CommitsView.module.css';
import master from '@components/data/css/Master.module.css';
import { motion } from 'framer-motion';
import { Octokit } from "octokit";


const Commit = ({ data }) => {

    const about = {
        'sch-py': {icon:'fa-brands fa-python', color:'#00b0ff'},
        'sch-js': {icon:'fa-brands fa-js', color:'#ffea00'},
        'sch-sh': {icon:'fa-solid fa-cube', color:'#76ff03'},
        'sch-cf': {icon:'fa-solid fa-file-code', color:'#d500f9'}
    }
    const commitOnHoverRules = {
        background: about[data.repository].color
    };

    return (
        <motion.ul whileHover={ commitOnHoverRules }>
            <li className={ about[data.repository].icon }></li>
            <li>{data.message}</li>
            <li>{Math.round(((Date.now() - new Date(data.date)) / 86_400_000))} days ago</li>
        </motion.ul>
    )
}

const CommitsView = () => {

    const [isLoading, setIsLoading]         = useState(null);
    const [error, setError]                 = useState(null);
    const [repositories, setRepositories]   = useState({'sch-py': [], 'sch-js': [], 'sch-sh': [], 'sch-cf': []});
    const [history, setHistory]             = useState([]);
    
    const scrollContainerRef                = useRef();
    const [canScrollUp, setCanScrollUp]     = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(true);
  
    const handleButtonScroll = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            setCanScrollUp(container.scrollTop > 0);
            setCanScrollDown(container.scrollTop !== (container.scrollHeight - container.clientHeight - 1));
        }
    };
    const scrollUpButton = () => {
        setCanScrollUp(
            prevCanScrollUp => {
                if (prevCanScrollUp) {
                    scrollContainerRef.current.scrollTop -= scrollContainerRef.current.children[0].clientHeight * 4;
                }
                return prevCanScrollUp;
            }
        );
    };
    
    const scrollDownButton = () => {
        const container = scrollContainerRef.current;
        console.log()
        setCanScrollDown(
            prevCanScrollDown => {
                if (prevCanScrollDown) {
                    scrollContainerRef.current.scrollTop += scrollContainerRef.current.children[0].clientHeight * 4;
                }
                return prevCanScrollDown;
            }
        );
    };

    useEffect(
        () => {
            const container = scrollContainerRef.current;
            if (container) {
                container.addEventListener('scroll', handleButtonScroll);
                handleButtonScroll();
            }
            return () => {
                if (container) {
                    container.removeEventListener('scroll', handleButtonScroll);
                }
            }
        },[handleButtonScroll]
    )

    useEffect(
        () => {
            const octokit           = new Octokit({ auth: import.meta.env.VITE_GITHUB_API_TOKEN });
            const fetchAllCommits   = async () => {
                try {
                    const responses = await Promise.all(
                        [
                            octokit.request('GET /repos/rhman-ibrahim/sch-py/commits'),
                            octokit.request('GET /repos/rhman-ibrahim/sch-js/commits'),
                            octokit.request('GET /repos/rhman-ibrahim/sch-sh/commits'),
                            octokit.request('GET /repos/rhman-ibrahim/sch-cf/commits')
                        ]
                    );
                    responses.map(
                        (response, index) => {
                        if (response.status === 200) {
                            setRepositories(
                                prevState => (
                                    {
                                        ...prevState,
                                        [Object.keys(repositories)[index]]: response.data
                                    }
                                )
                            );
                        } else {
                            setError(`Error fetching commits for repository ${Object.keys(repositories)[index]}`);
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
            Object.entries(repositories).forEach(([repository, commits]) => {
                commits.forEach(commit => {
                    combined.push(
                        {
                            repository: repository,
                            message:    commit.commit.message,
                            date:       commit.commit.author.date,
                            id:         commit.sha
                        }
                    );
                });
            });
            setHistory(combined.sort((a, b) => new Date(b.date) - new Date(a.date)));
        },[repositories]
    )

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section id={ style.repositoriesWrapper } data-section="commits">
            <div className={ master.infoDiv }>
                <h1>
                    <i className="fa-brands fa-github"></i>
                    <i className="fa-solid fa-code-commit"></i>
                </h1>
                <h2>
                    <span>{ history.length } Commits.</span>
                </h2>
                <p>A commit is a fundamental action that records changes to a repository's files.
                This project consists of { Object.keys(repositories).length > 1 ? `${Object.keys(repositories).length}
                repositories`:'1 repository' }. Commits are ordered by time of creation.</p>
            </div>
            <nav className={ master.scrollNav }>
                <button onClick={ scrollUpButton } style={{ visibility: canScrollUp ? 'visible':'hidden'}}>
                    <i className="material-icons">expand_less</i>
                </button>
                <button onClick={ scrollDownButton } style={{ visibility: canScrollDown ? 'visible':'hidden'}}>
                    <i className="material-icons">expand_more</i>
                </button>
            </nav>
            <div id={ style.commitsList } ref={ scrollContainerRef }>
                { history.map( commit => <Commit key={ commit.id } data= { commit } /> ) }
            </div>
        </section>
    );
};

export default CommitsView;