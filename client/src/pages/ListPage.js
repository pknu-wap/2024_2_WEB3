import { CATEGORY } from "../constants";
import styled from "styled-components";
import cheongTakjuListApi from "../api/cheongTakjuListApi";
import fruitWineListApi from "../api/fruitWineListApi";
import allListApi from "../api/allListApi";
import AlcoholList from "../components/alcoholList/AlcoholList";
import Header from "../components/common/Header";
import SearchBar from "../components/navSearchBar/SearchBar";
import Footer from "../components/common/Footer";
import "../styles/ListPage.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../components/navSearchBar/Navigation";

// SearchBar의 스타일 확장
const ListSearchBar = styled(SearchBar)`
  padding-top: 7%;
`;

const ListPage = () => {
  const { category } = useParams(); // URL에서 category 가져오기
  const [fetchApi, setFetchApi] = useState(null);

  // 카테고리에 따라 fetchApi 설정
  useEffect(() => {
    switch (category) {
      case CATEGORY.FRUIT_WINE:
        setFetchApi(() => fruitWineListApi);
        break;
      case CATEGORY.ALL:
        setFetchApi(() => allListApi);
        break;
      case CATEGORY.CHEONG_TAKJU:
      default:
        setFetchApi(() => cheongTakjuListApi);
        break;
    }
  }, [category]);

  return (
    <div className="ListPage">
      <Header bgColor="#F2EEE7" />
      <ListSearchBar />
      <Navigation />
      <AlcoholList fetchApi={fetchApi} category={category} />
      <Footer className="footer1" />
      <div className="list-footer">
        <img
          src="/images/listPage/list-footer.png"
          className="list-footer-img"
          alt="list-footer-img"
        />
      </div>
    </div>
  );
};

export default ListPage;
