import LabelsView from "@components/data/LabelsView";
import ListsView from "@components/data/ListsView";
import CardsView from "@components/data/CardsView";
import CommitsView from "@components/data/CommitsView";


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