import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import wrappers from '@components/css/Wrapper.module.css';
import style from '@components/css/LabelsView.module.css';
import { fetchLabels } from "@api/labels";
import { motion } from 'framer-motion';


const LabelsView = () => {

    const dispatch = useDispatch();
    const { labels, isLoading, count, error, about } = useSelector((state) => state.labels);
    
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
        <section id={ style.labelsWrapper } className={ wrappers.defaultWrapper }>
            <div id={ style.labelsInfo }>
                <h2>{ count } Labels.</h2>
            </div>
            <ul id={ style.labelsList }>
            {
                labels.map(
                    label => {
                        return (
                            <motion.li
                                key={ label.id }
                                className={ style.defaultLabel }
                                whileHover={
                                    {
                                        scale:1.4,
                                        background: about[label.name].color
                                    }
                                }
                            >
                                <span>
                                    <i
                                        className="material-symbols-outlined"
                                        style={{ color: about[label.name].color || label.color }}
                                    >{ about[label.name].icon || 'label' }</i>
                                    <strong>{ label.name }</strong>
                                </span>
                                <span>
                                    <small>{ label.uses } use/s</small>
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


export default LabelsView;