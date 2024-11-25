import { CATEGORY } from "../constants";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import AlcoholList from "../components/alcoholList/AlcoholList";
import Header from "../components/common/Header";
import SearchBar from "../components/navSearchBar/SearchBar";
import Footer from "../components/common/Footer";
import Navigation from "../components/navSearchBar/Navigation";
import Filters from "../components/filters/Filters";
import "../styles/ListPage.css";

import alcoholListApi from "../api/alcoholListApi";

// SearchBar의 스타일 확장
const ListSearchBar = styled(SearchBar)`
  padding-top: 7%;
`;

const ListPage = () => {
  const { category } = useParams(); // URL에서 category 가져오기
  const [filters, setFilters] = useState({ preferenceLevel: "", areas: [] });
  const [currentCategory, setCurrentCategory] = useState(category);

  useEffect(() => {
    // 카테고리 변경 시 필터 초기화 및 API 호출
    if (category !== currentCategory) {
      setFilters({ alcoholLevel: "", regions: [] }); // 필터 초기화
      setCurrentCategory(category); // 현재 카테고리 업데이트
    }
  }, [category, currentCategory, filters]);

  return (
    <div className="ListPage">
      <Header bgColor="#F2EEE7" />
      <ListSearchBar />
      <Navigation />
      <Filters onFilterChange={setFilters} category={category} />
      <AlcoholList category={category} filters={filters} />
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
