import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import wrappers from '@components/css/Wrapper.module.css';
import style from '@components/css/CardsView.module.css';
import { fetchCards } from "@api/cards";


const CardsView = () => {

    const dispatch                              = useDispatch();
    const { cards, isLoading, count, error }    = useSelector((state) => state.cards);
    const scrollContainerRef                    = useRef();
    const [canScrollLeft, setCanScrollLeft]     = useState(false);
    const [canScrollRight, setCanScrollRight]   = useState(true);

    const handleScrollButtons = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft < (container.scrollWidth - container.clientWidth));
        }
    };

    const handleWheel = event => {
        const scrollAmount = event.deltaY || event.deltaX;
        scrollContainerRef.current.scrollLeft += scrollAmount;
        event.preventDefault();
    };

    const scrollLeft = () => {
        setCanScrollLeft(
            (prevCanScrollLeft) => {
                if (prevCanScrollLeft) {
                    scrollContainerRef.current.scrollLeft -= scrollContainerRef.current.children[0].clientWidth;
                }
                return prevCanScrollLeft;
            }
        );
    };

    const scrollRight = () => {
        setCanScrollRight(
            (prevCanScrollRight) => {
                if (prevCanScrollRight) {
                    scrollContainerRef.current.scrollLeft += scrollContainerRef.current.children[0].clientWidth;
                }
                return prevCanScrollRight;
            }
        );
    };

    useEffect(
        () => {
            dispatch(fetchCards());
        },[dispatch]
    );
    
    useEffect(
        () => {
            const container = scrollContainerRef.current;
            if (container) {
                container.addEventListener('scroll', handleScrollButtons);
                container.addEventListener('wheel', handleWheel);
            }
            return () => {
                if (container) {
                    container.removeEventListener('scroll', handleScrollButtons);
                    container.removeEventListener('wheel', handleWheel);
                }
            };
        },[handleScrollButtons, handleWheel]
    )
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className={ wrappers.defaultWrapper }>
            <nav className={ style.horizontalScrollNav }>
                <button className={ style.scrollButton } onClick={ scrollLeft } style={{ visibility: canScrollLeft ? 'visible':'hidden'}}>
                    <i className="material-icons">chevron_left</i>
                </button>
                <button className={ style.scrollButton } onClick={ scrollRight } style={{ visibility: canScrollRight ? 'visible':'hidden'}}>
                    <i className="material-icons">chevron_right</i>
                </button>
            </nav>
            <section className={ style.horizontalScroll } ref={ scrollContainerRef }>
                {
                    cards.map(
                        card => {
                            return (
                                <div key={ card.id } className={ style.defaultCard }>
                                    <p>{ card.name }</p>
                                </div>
                            )
                        }
                    )
                }
            </section>
            <h1>{ count } Cards.</h1>
        </section>
    )
}

export default CardsView;