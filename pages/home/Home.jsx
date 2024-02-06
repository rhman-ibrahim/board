import LabelsView from "@components/data/LabelsView";
import ListsView from "@components/data/ListsView";
import CardsView from "@components/data/CardsView";
import CommitsView from "@components/data/CommitsView";
import master from "@pages/home/css/Master.module.css";


const Home = () => {
    return (
        <main id={ master.mainContainer }>
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