import ThemeProvider from '@theme/ThemeProvider';
import wrappers from '@components/css/Wrapper.module.css';
import style from '@components/css/Header.module.css';

const Header = () => {
    return (
        <header className={ style.Header }>
            <section className={`${ wrappers.defaultWrapper } ${ style.HeaderWrapper }`}>
                <div>
                    <h1>Scheme</h1>
                </div>
                <ThemeProvider />
            </section>
        </header>
    )
}

export default Header;