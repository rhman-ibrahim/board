const Nav = () => {

    const scrollIntoView = data => {
        const section = document.querySelector(`section[data-section=${data}]`);1
        section.scrollIntoView({behavoir:'smooth'});
    }
    
    return (
        <nav>
            <button type='button' onClick={ () => scrollIntoView('labels') }>
                <i className="fa-solid fa-tags"></i>
            </button>
            <button type='button' onClick={ () => scrollIntoView('lists') }>
                <i className="fa-solid fa-clipboard"></i>
            </button>
            <button type='button' onClick={ () => scrollIntoView('cards') }>
                <i className="fa-solid fa-ticket"></i>
            </button>
            <button type='button' onClick={ () => scrollIntoView('commits') }>
                <i className="fa-solid fa-code-commit"></i>
            </button>
        </nav>
    )
}

export default Nav;