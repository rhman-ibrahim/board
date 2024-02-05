import { useLocation } from 'react-router-dom';
import wrappers from '@components/css/Wrapper.module.css';
import style from '@components/css/ErrorView.module.css';


const Error = () => {

    const location = useLocation();

    return (
        <section className={ wrappers.defaultWrapper }> 
            <div className={ style.message }>
                <h1>
                    <i className='material-icons' style={{fontSize:'64px'}}>error</i>
                    <span>404</span>
                </h1>
                <p>The requested URL '<strong>{location.pathname}</strong>' does not exist.</p>
            </div>
        </section>
    )
}

export default Error;1