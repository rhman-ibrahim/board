import { useEffect, useState } from "react";
import style from './css/LabelList.module.css';
import { motion } from 'framer-motion';
import bridge from "@core/bridge";


const LabelList = () => {

    const [labels, setLabels]       = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
        <>
            <ul className={ style.labelsContainer }>
            {
                labels.map(
                    label => {
                        return (
                            <motion.li
                                key={ label.id }
                                className={ style.defaultLabelStyle }
                                whileHover={{ scale:1.2 }}
                            >
                                <i className="material-symbols-outlined" style={{ color: label.color }}>label</i>
                                <strong>{ label.name }</strong>
                            </motion.li>
                        );
                    }
                )
            }
            </ul>
        </>
    );
    
}


export default LabelList;