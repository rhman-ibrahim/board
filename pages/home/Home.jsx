import LabelsView from "@components/data/LabelsView";
import ListsView from "@components/data/ListsView";
import CardsView from "@components/data/CardsView";
import CommitsView from "@components/data/CommitsView";
import wrappers from "@components/css/Wrapper.module.css";


const Home = () => {
    return (
        <main id={ wrappers.mainContainer }>
            <div id="trello">
                <LabelsView />
                <ListsView />
                <CardsView />
            </div>
            <div id="github">
                <CommitsView />
            </div>
        </main>
    )
}

export default Home;