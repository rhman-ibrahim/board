<header>
    <div>
        <img src="https://skillicons.dev/icons?i=react">
        <img src="https://skillicons.dev/icons?i=vite">
        <img src="https://skillicons.dev/icons?i=github" >
    </div>
    <div>
        <h1>Board</h1>
        <p><strong>Board</strong> is a React (Vite) application used to display a project's <strong>Trello</strong> board data alongside with its <strong>Github</strong> related repositories commits.</p>
    </div>
</header>
<section>
    <div>
        <h2>Trello</h2>
        <p><strong>Trello</strong> is a project management tool that works for any type of project, workflow, or team. The data below are fetched with <strong>Trello</strong>'s REST API</p>
    </div>
    <div>
        <h3>1. Labels</h3>
        <p>Each label represents a topic or a feature that the project is addressing or working on. The number of 'uses' represents how many time a topic or a feature is mentioned.</p>
    </div>
    <div>
        <h3>2. Lists</h3>
        <p>Each list represents a phase in the project, so the project consits of 6 phases, and 'X/Y' the number of cards in the phase to the total number of cards.</p>
    </div>
    <div>
        <h3>3. Cards</h3>
        <p>Each card repreesnts a feature or a task which may be addressing a single label (topic or feature) or multiple labels. Cards are ordered by phases.</p>
    </div>
</section>
<section>
    <div>
        <h2>Github</h2>
        <p>The data below are fetched using <strong>Github</strong>'s REST API, by default the commits endpoint fetches the last 30 commits.</p>
    </div>
    <div>
        <h3>Commits</h3>
        <p>A commit is a fundamental action that records changes to a repository's files. This project consists of 4 repositories. Commits of all repositories are combined and ordered by time of creation.</p>
    </div>
</section>
<footer>
    <hr />
    <p><strong>With the great work done by the teams working in Github and in Trello; not only this project, but also much good ideas won't see the light, much respect and thanks won't be enough.</strong></p>
    <nav>
        <ul>
            <li>
                <a href="https://www.trello.com">Trello.</a>
            </li>
            <li>
                <a href="https://developer.atlassian.com/cloud/trello/rest/api-group-actions/#api-group-actions">Trello's REST API Documentation.</a>
            </li>
        </ul>
        <ul>
            <li>
                <a href="https://docs.github.com/en/rest">Github's REST API Documentation (in English).</a>
            </li>
            <li>
                <a href="https://github.com/octokit">Github's Octokit.</a>
            </li>
        </ul>
    </nav>
</footer>