import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import wrappers from '@components/css/Wrapper.module.css';
import style from '@components/css/CardsView.module.css';
import { fetchLists } from "@api/lists";
import { fetchCards } from "@api/cards";


const CardsView = () => {

    const dispatch                              = useDispatch();
    const { lists, about }                      = useSelector((state) => state.lists);
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
            dispatch(fetchLists());
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
        <section id={ style.cardsWrapper } className={ wrappers.defaultWrapper }>
            <div id={ style.cardsInfo }>
                <h2>{ count } Cards.</h2>
            </div>
            <nav id={ style.cardsScrollNav }>
                <button onClick={ scrollLeft } style={{ visibility: canScrollLeft ? 'visible':'hidden'}}>
                    <i className="material-icons">chevron_left</i>
                </button>
                <button onClick={ scrollRight } style={{ visibility: canScrollRight ? 'visible':'hidden'}}>
                    <i className="material-icons">chevron_right</i>
                </button>
            </nav>
            <div id={ style.cardsScroll } ref={ scrollContainerRef }>
                {
                    cards.map(
                        card => {
                            const cardListName = lists.filter(list => list.id === card.idList)[0].name;
                            return (
                                <div key={ card.id } className={ style.defaultCard }>
                                    <h3>
                                        <i className="material-symbols-outlined">{ about[cardListName].icon }</i>
                                        <span>{ cardListName }</span>
                                    </h3>
                                    <p>{ card.name }</p>
                                    <ul>
                                        { card.labels.map(label => <li key={ label.id }>{ label.name }</li>) }
                                    </ul>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </section>
    )
}

export default CardsView;