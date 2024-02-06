import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import master from '@components/data/css/Master.module.css';
import style from '@components/data/css/CardsView.module.css';
import { fetchLists } from "@api/lists";
import { fetchCards } from "@api/cards";
import { motion } from 'framer-motion';


const Card = ({ listName, about, card }) => {

    const cardIconRules     = {
        color: about[listName].background
    };
    const cardOnHoverRules  = {
        background: about[listName].background,
        color: about[listName].color
    };

    return (
        <motion.div className={ style.Card } whileHover={cardOnHoverRules}>
            <h3>
                <i className="material-symbols-outlined" style={ cardIconRules }>{ about[listName].icon }</i>
                <span>{ listName }</span>
            </h3>
            <p>{ card.name }</p>
            <ul>
                { card.labels.map(label => <li key={ label.id }>{ label.name }</li>) }
            </ul>
        </motion.div>
    )
}

const CardsView = () => {

    const dispatch                              = useDispatch();
    const { cards, isLoading, count, error }    = useSelector((state) => state.cards);
    const { lists, about }                      = useSelector((state) => state.lists);

    const scrollContainerRef                    = useRef();
    // Handling buttons scroll.
    const [canScrollLeft, setCanScrollLeft]     = useState(false);
    const [canScrollRight, setCanScrollRight]   = useState(true);
    // Handling touch scroll.
    const [isDown, setIsDown]                   = useState(false);
    const [startX, setStartX]                   = useState(null);
    const [touchScroll, setTouchScroll]         = useState(0);


    const handleMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - e.currentTarget.offsetLeft);
        setTouchScroll(e.currentTarget.scrollLeft);
    };
    const handleMouseUp = () => {
        setIsDown(false);
    };
    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x                                 = e.pageX - e.currentTarget.offsetLeft;
        const walk                              = x - startX;
        e.currentTarget.scrollLeft              = touchScroll - walk;
    };
    const handleWheelScroll = event => {
        const scrollAmount                      = event.deltaY || event.deltaX;
        scrollContainerRef.current.scrollLeft  += scrollAmount;
        event.preventDefault();
    };

    const HandleButtonScroll = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft < (container.scrollWidth - container.clientWidth));
        }
    };
    const scrollLeftButton = () => {
        setCanScrollLeft(
            (prevCanScrollLeft) => {
                if (prevCanScrollLeft) {
                    scrollContainerRef.current.scrollLeft -= scrollContainerRef.current.children[0].clientWidth;
                }
                return prevCanScrollLeft;
            }
        );
    };
    const scrollRightButton = () => {
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
                container.addEventListener('scroll', HandleButtonScroll);
                container.addEventListener('wheel', handleWheelScroll);
            }
            return () => {
                if (container) {
                    container.removeEventListener('scroll', HandleButtonScroll);
                    container.removeEventListener('wheel', handleWheelScroll);
                }
            };
        },[HandleButtonScroll, handleWheelScroll]
    )
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section id={ style.cardsWrapper } data-section="cards">
            <div className={ master.infoDiv }>
                <h1>
                    <i className="fa-brands fa-trello"></i>
                    <i className="fa-solid fa-ticket"></i>
                </h1>
                <h2>
                    <span>{ count } Cards.</span>
                </h2>
                <p>Each card repreesnts a feature or a task which may be addressing a single label
                (topic or feature) or multiple labels. Cards are ordered by phases.</p>
            </div>
            <nav id={ style.cardsScrollNav }>
                <button onClick={ scrollLeftButton } style={{ visibility: canScrollLeft ? 'visible':'hidden'}}>
                    <i className="material-icons">chevron_left</i>
                </button>
                <button onClick={ scrollRightButton } style={{ visibility: canScrollRight ? 'visible':'hidden'}}>
                    <i className="material-icons">chevron_right</i>
                </button>
            </nav>
            <div
                id              = { style.cardsScroll }
                ref             = { scrollContainerRef }
                onMouseDown     = { handleMouseDown }
                onMouseMove     = { handleMouseMove }
                onMouseUp       = { handleMouseUp }
                onMouseLeave    = { handleMouseUp }
            >
                {
                    cards.map(
                        card => <Card
                            listName    = { lists.filter(list => list.id === card.idList)[0].name }
                            about       = { about }
                            card        = { card }
                        />
                    )
                }
            </div>
        </section>
    )
}

export default CardsView;