import { NavLink } from 'react-router-dom';
import ThemeProvider from '@theme/ThemeProvider';
import style from '@components/base/css/Header.module.css';

const Header = () => {
    return (
        <header className={ style.Header }>
            <section className={ style.HeaderWrapper }>
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