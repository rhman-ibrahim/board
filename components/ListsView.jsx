import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import wrappers from '@components/css/Wrapper.module.css';
import style from '@components/css/ListsView.module.css';
import { fetchLists } from "@api/lists";
import { fetchCards } from "@api/cards";
import { motion } from 'framer-motion';


const ListsView = () => {

    const dispatch                                      = useDispatch();
    const { cards }                                     = useSelector((state) => state.cards);
    const { lists, isLoading, count, error, glyphs }    = useSelector((state) => state.lists);

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
        <section id={ style.listsWrapper } className={ wrappers.defaultWrapper }>
            <div id={ style.listsInfo }>
                <h1>{ count } Phases.</h1>
            </div>
            <div id={ style.listsGrid }>
                {
                    lists.map(
                        list => {
                            return (
                                <motion.div
                                    key         = { list.id }
                                    className   = { style.defaultList }
                                    style       = {
                                        {
                                            color: glyphs[list.name].background,
                                            outline: `1px solid ${glyphs[list.name].background}`
                                        }
                                    }
                                    whileHover={
                                        {
                                            outline: 'unset',
                                            scale: window.innerWidth >= 960 ? 1.5 : 1,
                                            background: glyphs[list.name].background,
                                            boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px`,
                                            color: glyphs[list.name].color,
                                            zIndex: 3
                                        }
                                    }
                                >
                                    <h2>{ list.name }</h2>
                                    <h3>
                                        <i className="material-symbols-outlined">{ glyphs[list.name].icon }</i>
                                        <span>{ cards.filter(card => card.idList === list.id).length }</span>
                                    </h3>
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