import Header from "../components/common/Header";
import AlcoholList from "../components/alcoholList/AlcoholList";
import SearchBar from "../components/navSearchBar/SearchBar";
import Footer from "../components/common/Footer";
import cheongTakjuListApi from "../api/cheongTakjuListApi";

const CheongtakjuPage = () => {
  return (
    <div>
      <Header />
      <SearchBar />
      <AlcoholList fetchApi={cheongTakjuListApi} />
      <Footer />
    </div>
  );
};

export default CheongtakjuPage;
