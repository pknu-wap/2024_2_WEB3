import Header from "../components/common/Header";
import SearchBar from "../components/navSearchBar/SearchBar";
import AlcoholList from "../components/alcoholList/AlcoholList";
import fruitWineListApi from "../api/fruitWineListApi";
import Footer from "../components/common/Footer";

const FruitWinePage = () => {
  return (
    <div>
      <Header />
      <SearchBar />
      <AlcoholList fetchApi={fruitWineListApi} />
      <Footer />
    </div>
  );
};

export default FruitWinePage;
