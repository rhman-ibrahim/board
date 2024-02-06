import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from '@components/data/css/LabelsView.module.css';
import master from '@components/data/css/Master.module.css';
import { fetchLabels } from "@api/labels";
import { motion } from 'framer-motion';


const Label = ({ total, about, data }) => {
    
    const labelFlexRule     = {
        flex: Number(data.uses/total),
    };
    const labelOnHoverRules = {
        scale:1.4,
        background: about[data.name].color,
    };
    const labelIconRules    = {
        color: about[data.name].color || data.color
    }

    return (
        <motion.div className={ style.label } style={ labelFlexRule } whileHover={ labelOnHoverRules }>
            <h2>
                <i className="material-symbols-outlined" style={ labelIconRules }>{ about[data.name].icon || 'label' }</i>
                <strong>{ data.name }</strong>
            </h2>
            <h3>
                <small>{ data.uses } use/s</small>
            </h3>
        </motion.div>
    );
}

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
            <div className={ master.infoDiv }>
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
            <div id={ style.labelsList }>
            {
                labels.map(
                    label => <Label
                        key     = { label.id }
                        data    = { label }
                        about   = { about }
                        total   = { totalUses }
                    />
                )
            }
            </div>
        </section>
    );
    
}


export default LabelsView;