import Header from "../components/common/Header";
import SearchBar from "../components/navSearchBar/SearchBar";
import AlcoholList from "../components/alcoholList/AlcoholList";
import fruitWineListApi from "../api/fruitWineListApi";
import Footer from "../components/common/Footer";
import "../styles/ListPage.css";

const FruitWinePage = () => {
  return (
    <div className="list-page FruitWinePage">
      <Header bgColor="#F2EEE7" />
      <SearchBar />
      <AlcoholList fetchApi={fruitWineListApi} />
      <Footer />
    </div>
  );
};

export default FruitWinePage;
