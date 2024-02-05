import CardsView from "@components/data/CardsView";
import LabelsView from "@components/data/LabelsView";
import ListsView from "@components/data/ListsView";
import CommitsView from "@components/data/CommitsView";

1
const Home = () => {
    return (
        <>
            <LabelsView />
            <ListsView />
            <CardsView />
            <CommitsView />
        </>
    )
}

export default Home;