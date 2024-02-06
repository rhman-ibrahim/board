import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from '@components/data/css/ListsView.module.css';
import master from '@components/data/css/Master.module.css';
import { fetchLists } from "@api/lists";
import { fetchCards } from "@api/cards";
import { motion } from 'framer-motion';


const List = ({ listCards, totalCard, about, data }) => {

    const listOnHoverRules = {
        scale: window.innerWidth >= 960 ? 1.4 : 1,
        background: about[data.name].background,
        color: about[data.name].color,
        zIndex: 3
    };
    const listIconRules = {
        color: about[data.name].background
    };

    return (
        <motion.div className={ style.defaultList } whileHover={ listOnHoverRules }>
            <h2>{ listCards }/{ totalCard }</h2>
            <h3>
                <i className="material-symbols-outlined" style={ listIconRules }>{ about[data.name].icon }</i>
                <span>{ data.name }</span>
            </h3>
            <p>{ about[data.name].description }</p>
        </motion.div>
    )
}

const ListsView = () => {

    const dispatch                                  = useDispatch();
    const { cards }                                 = useSelector((state) => state.cards);
    const { lists, isLoading, count, error, about } = useSelector((state) => state.lists);

    useEffect(
        () => {
            dispatch(fetchLists());
            dispatch(fetchCards());
        },[dispatch]
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section id={ style.listsWrapper } data-section="lists">
            <div className={ master.infoDiv }>
                <h1>
                    <i className="fa-brands fa-trello"></i>
                    <i className="fa-solid fa-clipboard"></i>
                </h1>
                <h2>
                    <span>{ count } Lists.</span>
                </h2>
                <p>Each list represents a phase in the project, so the project consits of { count } phases,
                and <strong>'X/Y'</strong> the number of cards in the phase to the total number of cards.</p>
            </div>
            <div id={ style.listsGrid }>
                {
                    lists.map(
                        list => <List
                            key         = { list.id }
                            data        = { list } 
                            listCards   = { cards.filter(card => card.idList === list.id).length }
                            totalCard   = { cards.length }
                            about       = { about }
                        />
                    )
                }
            </div>
        </section>
    )
}

export default ListsView;