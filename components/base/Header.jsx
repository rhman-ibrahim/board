import { NavLink } from 'react-router-dom';
import ThemeProvider from '@theme/ThemeProvider';
import wrappers from '@components/css/Wrapper.module.css';
import style from '@components/css/Header.module.css';

const Header = () => {
    return (
        <header className={ style.Header }>
            <section className={`${ wrappers.defaultWrapper } ${ style.HeaderWrapper }`}>
                <div>
                    <NavLink to="/">
                        <i className='material-icons'>home</i>
                        <span>Scheme</span>
                    </NavLink>
                </div>
                <ThemeProvider />
            </section>
        </header>
    )
}

// 

export default Header;