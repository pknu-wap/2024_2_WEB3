import styled from "styled-components";
import cheongTakjuListApi from "../api/cheongTakjuListApi";
import fruitWineListApi from "../api/fruitWineListApi";
import AlcoholList from "../components/alcoholList/AlcoholList";
import Header from "../components/common/Header";
import SearchBar from "../components/navSearchBar/SearchBar";
import Footer from "../components/common/Footer";
import "../styles/ListPage.css";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// SearchBar의 스타일 확장
const ListSearchBar = styled(SearchBar)`
  padding-top: 7%;
`;

const ListPage = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(
    location.pathname.includes("fruitWine") ? "fruitWine" : "cheongtakju"
  );

  // URL이 변경되었을 때 상태 업데이트
  useEffect(() => {
    if (location.pathname.includes("fruitWine")) {
      setSelectedCategory("fruitWine");
    } else {
      setSelectedCategory("cheongtakju");
    }
  }, [location.pathname]);

  // 선택된 카테고리에 따라 API 설정
  const fetchApi =
    selectedCategory === "cheongtakju" ? cheongTakjuListApi : fruitWineListApi;

  return (
    <div className="ListPage">
      <Header bgColor="#F2EEE7" />
      <ListSearchBar />
      <AlcoholList fetchApi={fetchApi} />
      <Footer className="footer1" />
      <div className="list-footer">
        <img
          src="images/list-footer.png"
          className="list-footer-img"
          alt="list-footer-img"
        />
      </div>
    </div>
  );
};

export default ListPage;
