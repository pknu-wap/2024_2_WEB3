import Header from "../components/common/Header";
import AlcoholList from "../components/alcoholList/AlcoholList";
import SearchBar from "../components/navSearchBar/SearchBar";
import Footer from "../components/common/Footer";
import cheongTakjuListApi from "../api/cheongTakjuListApi";
import "../styles/ListPage.css";

const CheongtakjuPage = () => {
  return (
    <div className="list-page CheongtakjuPage">
      <Header bgColor="#F2EEE7" />
      <SearchBar />
      <AlcoholList fetchApi={cheongTakjuListApi} />
      <Footer />
    </div>
  );
};

export default CheongtakjuPage;
