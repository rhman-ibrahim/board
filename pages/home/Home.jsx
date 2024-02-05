import CardsView from "@components/CardsView";
import LabelsView from "@components/LabelsView";
import ListsView from "@components/ListsView";
import CommitsView from "@components/CommitsView";


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