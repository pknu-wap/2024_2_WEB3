import Header from "../components/common/Header";
import SearchBar from "../components/navSearchBar/SearchBar";
import AlcoholList from "../components/alcoholList/AlcoholList";
import fruitWineListApi from "../api/fruitWineListApi";
import Footer from "../components/common/Footer";
import SearchPage from "../components/search/search";

const FruitWinePage = () => {
  return (
    <div>
      <Header />
      <SearchPage />
      <AlcoholList fetchApi={fruitWineListApi} />
      <Footer />
    </div>
  );
};

export default FruitWinePage;
