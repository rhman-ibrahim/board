import CardsView from "@components/CardsView";
import LabelsView from "@components/LabelsView";
import ListsView from "@components/ListsView";
import CommitsView from "@components/CommitsView";


const Home = () => {
    return (
        <>
            <ListsView />
            <CardsView />
            <LabelsView />
            <CommitsView />
        </>
    )
}

export default Home;