import { useEffect, useState } from "react";
import wrappers from '@components/css/Wrapper.module.css';
import style from './css/LabelSection.module.css';
import { motion } from 'framer-motion';
import bridge from "@core/bridge";


const LabelsSection = () => {

    const [labels, setLabels]       = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [featuresCount, setCount] = useState(0);
    const [error, setError]         = useState(null);
    const KEY                       = import.meta.env.VITE_TRELLO_API_KEY;
    const TOKEN                     = import.meta.env.VITE_TRELLO_API_TOKEN;

    useEffect(
        () => {
            
            const fetchLabels = async () => {
                setIsLoading(true);
                try {
                    const response = await bridge.get(`labels?key=${KEY}&token=${TOKEN}`);
                    setLabels(response.data);
                    setCount(response.data.reduce((total, label) => total + label.uses, 0));
                    setError(null);
                } catch (error) {
                    setError(error)
                } finally {
                    setIsLoading(false);
                }
            }
            
            fetchLabels();
            
            return () => {
                // Cleanup tasks, if any
            };

        },[]
    )

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <section className={`${wrappers.defaultWrapper} ${style.labelsWrapper}`}>
            <h1 className={ style.featuresHeading }>{ featuresCount } Features.</h1>
            <ul className={ style.labelsWrapperUl }>
            {
                labels.map(
                    label => {
                        return (
                            <motion.li
                                key={ label.id }
                                className={ style.defaultLabel }
                                whileHover={{ scale:1.2 }}
                            >
                                <span>
                                    <i className="material-symbols-outlined" style={{ color: label.color }}>label</i>
                                    <strong>{ label.name }</strong>
                                </span>
                                <span>
                                    <small>{ label.uses } feature/s</small>
                                    <small>{ (label.uses / featuresCount).toFixed(2) * 100 }%</small>
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