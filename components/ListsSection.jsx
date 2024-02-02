import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import wrappers from '@components/css/Wrapper.module.css';
import { fetchLists } from "@api/lists";


const ListsSection = () => {

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
        <section className={ wrappers.defaultWrapper }>
            <h2>{ count } Lists.</h2>
            <ul>
                {
                    lists.map(
                        list => {
                            return <li key={ list.id }>{ list.name }</li>
                        }
                    )
                }
            </ul>
        </section>
    )

}

export default ListsSection;