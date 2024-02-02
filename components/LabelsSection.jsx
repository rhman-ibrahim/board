import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import wrappers from '@components/css/Wrapper.module.css';
import style from '@components/css/SectionList.module.css';
import { fetchLabels } from "@api/labels";
import { motion } from 'framer-motion';


const LabelsSection = () => {

    const dispatch = useDispatch();
    const { labels, isLoading, count, cards, error } = useSelector((state) => state.labels);
    
    useEffect(
        () => {
            dispatch(fetchLabels());
        },[dispatch]
    )

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className={`${wrappers.defaultWrapper} ${style.labelsWrapper}`}>
            <h1 className={ style.counterHeading }>{ cards } Features.</h1>
            <ul className={ style.listWrapper }>
            {
                labels.map(
                    label => {
                        return (
                            <motion.li
                                key={ label.id }
                                className={ style.defaultLi }
                                whileHover={{ scale:1.2 }}
                            >
                                <span>
                                    <i className="material-symbols-outlined" style={{ color: label.color }}>label</i>
                                    <strong>{ label.name }</strong>
                                </span>
                                <span>
                                    <small>{ label.uses } feature/s</small>
                                    <small>{ (label.uses / cards).toFixed(2) * 100 }%</small>
                                </span>
                            </motion.li>
                        );
                    }
                )
            }
            </ul>
        </section>
    );
    
}


export default LabelsSection;