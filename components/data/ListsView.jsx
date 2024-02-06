import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import master from '@components/data/css/Master.module.css';
import style from '@components/data/css/ListsView.module.css';
import { fetchLists } from "@api/lists";
import { fetchCards } from "@api/cards";
import { motion } from 'framer-motion';


const ListsView = () => {

    const dispatch                                      = useDispatch();
    const { cards }                                     = useSelector((state) => state.cards);
    const { lists, isLoading, count, error, about }    = useSelector((state) => state.lists);

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
                        list => {
                            return (
                                <motion.div
                                    key         = { list.id }
                                    className   = { style.defaultList }
                                    whileHover={
                                        {
                                            scale: window.innerWidth >= 960 ? 1.4 : 1,
                                            background: about[list.name].background,
                                            color: about[list.name].color,
                                            zIndex: 3
                                        }
                                    }
                                >
                                    <h2>{ cards.filter(card => card.idList === list.id).length }/{ cards.length }</h2>
                                    <h3>
                                        <i className="material-symbols-outlined" style={{ color: about[list.name].background }}>{ about[list.name].icon }</i>
                                        <span>{ list.name }</span>
                                    </h3>
                                    <p>{ about[list.name].description }</p>
                                </motion.div>
                            )
                        }
                    )
                }
            </div>
        </section>
    )

}

export default ListsView;