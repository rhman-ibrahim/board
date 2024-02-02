import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCards } from "@api/cards";

const CardsView = () => {

    const dispatch = useDispatch();
    const { cards, isLoading, count, error } = useSelector((state) => state.cards);

    useEffect(
        () => {
            dispatch(fetchCards());
        },[dispatch]
    )

    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section>
            <h1>{ count } Cards.</h1>
            {
                cards.map(
                    card => {
                        return (
                            <div key={ card.id }>
                                <p>{ card.name }</p>
                            </div>
                        )
                    }
                )
            }
        </section>
    )
}

export default CardsView;