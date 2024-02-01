import { useState, useEffect } from 'react';


const useIntersectionObserver = ({selector, threshold}) => {

    const [isIntersecting, setIsIntersecting] = useState(false);
    const options = {root: null, rootMargin: '0px', threshold:threshold}
    
    useEffect(
        () => {
            
            const element = typeof(selector) === "string" ?
            document.querySelector(selector) : selector;

            if (!element) return;
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(
                        (entry) => {
                            if (entry.isIntersecting) setIsIntersecting(true)
                            else setIsIntersecting(false);
                        }
                    );
                },
                options
            );
            
            observer.observe(element);
            
            return () => {
                observer.unobserve(element);
            };
        },
        [selector, options]
    );
    return isIntersecting;
}

export default useIntersectionObserver;
