import { useEffect, useState } from "react";
import wrappers from '@components/css/Wrapper.module.css';
import bridge from "@core/bridge";


const ListsSection = () => {

    const [lists, setLists]         = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]         = useState(null);
    const KEY                       = import.meta.env.VITE_TRELLO_API_KEY;
    const TOKEN                     = import.meta.env.VITE_TRELLO_API_TOKEN;

    useEffect(
        () => {
            
            const fetchLists = async () => {
                setIsLoading(true);
                try {
                    const response = await bridge.get(`lists?key=${KEY}&token=${TOKEN}`);
                    setLists(response.data);
                    setError(null);
                } catch (error) {
                    setError(error)
                } finally {
                    setIsLoading(false);
                }
            }
            
            fetchLists();
            
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
        <section className={ wrappers.defaultWrapper }>
            <h2>{ lists.length } lists.</h2>
            <ul>
                {
                    lists.map(
                        list => {
                            return <li>{ list.name }</li>
                        }
                    )
                }
            </ul>
        </section>
    )

}

export default ListsSection;