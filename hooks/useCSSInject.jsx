import { useEffect } from 'react';


const useCSSInject = (cssFilePath) => {
  
    useEffect(
        () => {
            const link = document.createElement('link');
            
            link.rel    = 'stylesheet';
            link.type   = 'text/css';
            link.href   = cssFilePath;

            document.head.appendChild(link);

            return () => {
                document.head.removeChild(link);
            };
        },
        [cssFilePath]
    );
};

export default useCSSInject;
