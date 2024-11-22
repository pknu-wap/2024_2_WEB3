import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import SearchBar from "../navSearchBar/SearchBar";
import "./MainContents.css";

// SearchBar의 스타일 확장
const MainSearchBar = styled(SearchBar)`
  width: 100%;
  margin-bottom: 10px;
`;

const MainContents = () => {
  return (
    <div className="MainContents">
      <div className="banner-section">
        <img src="images/mainpage/main-banner.png" className="banner-img" />
      </div>

      <MainSearchBar />

      {/* 카테고리 섹션 */}
      <div className="category-section">
        <p className="category-title">
          다채로운 전통주 한 잔, <span className="highlight">홀짝</span> 맛보는
          즐거움
        </p>

        {/* 첫 번째 블록 */}
        <div class="category-block category-block1">
          <div class="cate-img cate-img1">
            <img src="images/mainpage/category-img1.png" alt="category-img1" />
          </div>
          <div class="cate-text cate-text1">
            <h3>
              쌀과 물로 빚어낸 맑은 술, <span className="cate-span">청주</span>
            </h3>
            <p>
              빛깔이 맑고 투명해 '맑은 술'로 불리는 청주는 쌀을 발효해 <br />
              은은한 향과 부드러운 맛을 자랑합니다.
            </p>
            <Link to="/cheongtakju" className="cate-link">
              더 보러가기 &gt;
            </Link>
          </div>
          <img
            src="/images/mainpage/sub-category-img1.png"
            alt="sub-category-img1"
            class="cate-sub cate-sub1"
          />
        </div>

        {/* 두 번째 블록 */}
        <div class="category-block category-block2">
          <div class="cate-text cate-text2">
            <h3>
              부드럽고 진한 맛, 전통의 <span className="cate-span">탁주</span>
            </h3>
            <p>
              쌀과 누룩으로 만든 걸쭉한 전통주인 탁주는 고소하고 깊은 맛이
              특징입니다. <br />
              신선한 발효 향이 어우러져 풍미가 깊습니다.
            </p>
            <Link to="/cheongtakju" className="cate-link">
              더 보러가기 &gt;
            </Link>
          </div>
          <div class="cate-img cate-img2">
            <img src="images/mainpage/category-img2.png" alt="category-img2" />
          </div>
          <img
            src="/images/mainpage/sub-category-img2.png"
            alt="sub-category-img2"
            class="cate-sub cate-sub2"
          />
        </div>

        {/* 세 번째 블록 */}
        <div class="category-block category-block3">
          <div class="cate-img cate-img3">
            <img src="images/mainpage/category-img3.png" alt="category-img3" />
          </div>
          <div class="cate-text cate-text3">
            <h3>
              과일의 향과 맛을 담은 술,
              <span className="cate-span"> 과실주</span>
            </h3>
            <p>
              매실, 복숭아, 오미자 등 다양한 과일로 만든 전통주인 과실주는
              과일의 상큼한 향과 <br />
              맛을 즐길 수 있습니다.
            </p>
            <Link to="/fruitWine" className="cate-link">
              더 보러가기 &gt;
            </Link>
          </div>
          <img
            src="/images/mainpage/sub-category-img3.png"
            alt="sub-category-img3"
            class="cate-sub cate-sub3"
          />
        </div>
      </div>
    </div>
  );
};

export default MainContents;
