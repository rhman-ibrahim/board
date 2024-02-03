import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import wrappers from '@components/css/Wrapper.module.css';
import style from '@components/css/ViewList.module.css';
import { fetchLists } from "@api/lists";
import { motion } from 'framer-motion';


const ListsView = () => {

    const dispatch = useDispatch();
    const { lists, isLoading, count, error } = useSelector((state) => state.lists);

    useEffect(
        () => {
            dispatch(fetchLists());
        },[dispatch]
    )

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section className={`${wrappers.defaultWrapper} ${style.labelsWrapper}`}>
            <h1>{ count } Lists.</h1>
            <ul className={ style.listWrapper }>
                {
                    lists.map(
                        list => {
                            return (
                                <motion.li
                                    key={ list.id }
                                    className={ style.defaultLi }
                                    whileHover={{ scale:1.2 }}
                                >
                                    <span>
                                        <i className="material-symbols-outlined">fact_check</i>
                                        <strong>{ list.name }</strong>
                                    </span>
                                </motion.li>
                            )
                        }
                    )
                }
            </ul>
        </section>
    )

}

export default ListsView;