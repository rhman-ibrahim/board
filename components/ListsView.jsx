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
        <section className={ wrappers.defaultWrapper }>
            <div className={ style.listsGrid }>
                {
                    lists.map(
                        list => {
                            return (
                                <div
                                    key         = { list.id }
                                    className   = { style.defaultList }
                                    style       = {
                                        {
                                            background: glyphs[list.name].background,
                                            color: glyphs[list.name].color
                                        }
                                    }
                                >
                                    <h2>{ list.name }</h2>
                                    <h3>
                                        <i className="material-symbols-outlined">{ glyphs[list.name].icon }</i>
                                        <span>{ cards.filter(card => card.idList === list.id).length }</span>
                                    </h3>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </section>
    )

}

export default ListsView;