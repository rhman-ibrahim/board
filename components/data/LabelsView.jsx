import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import wrappers from '@components/css/Wrapper.module.css';
import style from '@components/css/LabelsView.module.css';
import { fetchLabels } from "@api/labels";
import { motion } from 'framer-motion';


const LabelsView = () => {

    const dispatch = useDispatch();
    const { labels, totalUses, isLoading, count, error, about } = useSelector((state) => state.labels);
    
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
        <section id={ style.labelsWrapper } data-section="labels">
            <div className={ wrappers.infoDivWrapper }>
                <h1>
                    <i className="fa-brands fa-trello"></i>
                    <i className="fa-solid fa-tags"></i>
                </h1>
                <h2>
                    <span>{ count } Labels.</span>
                </h2>
                <p>Each label represents a topic or a feature that the project is addressing or working on.
                The number of <strong>'uses'</strong> represents how many time a topic or a feature is mentioned.</p>
            </div>
            <ul id={ style.labelsList }>
            {
                labels.map(
                    label => {
                        return (
                            <motion.li
                                key={ label.id }
                                className={ style.defaultLabel }
                                style={
                                    {
                                        flex: Number(label.uses/totalUses),
                                    }
                                }
                                whileHover={
                                    {
                                        scale:1.4,
                                        background: about[label.name].color,
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