import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import SearchBar from "../navSearchBar/SearchBar";
import "./MainContents.css";
import Navigation from "../navSearchBar/Navigation";

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
      {/* <Navigation /> */}

      {/* 카테고리 섹션 */}
      <div className="section category-section">
        <p className="title category-title">
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

      {/* 북마크 섹션 */}
      <div className="section bookmark-section">
        <p className="title bookmark-title">
          기억하고 싶은 한 잔, 나만의 리스트 저장
        </p>

        <div className="bmk-container">
          <div className="bmk-text bmk-text1">
            <h3>마이페이지에서 나만의 선호 도수를 설정해 보세요</h3>
            <p>
              새로운 전통주를 고를 때 기준을 세울 수 있습니다. <br />
              나만의 선호도를 기록하여 전통주 탐색의 즐거움을 더해보세요!
            </p>
          </div>

          <div className="bmk-img">
            <img src="/images/mainpage/bmk-img.png" alt="bookmark-image" />
          </div>

          <div className="bmk-text bmk-text2">
            <h3>마음에 드는 술을 리스트에 추가해 보세요</h3>
            <p>
              마이페이지에서 좋아하거나 관심이 있는 전통주를 간편하게 모아 보며
              <br />
              나만의 전통주 컬렉션을 만들어가세요.
            </p>
          </div>
        </div>
      </div>

      {/* 페어링 섹션 */}
      <div className="section pairing-section">
        <p className="title pairing-title">전통주와 어울리는 완벽한 안주</p>

        <div className="pairing-container">
          <div className="pairing-img">
            <img src="images/mainpage/pairing-img.png" alt="pairing-image" />
          </div>

          <div className="pairing-text">
            <h3>선택한 전통주와 가장 잘 어울리는 안주를 추천 받아 보세요!</h3>
            <p>
              각 전통주의 특성에 맞춘 안주를 제안하여 술과 안주가 조화를 이루는
              최상의 맛을 경험하실 수 있습니다.
              <br />술 한 잔과 안주 한 접시의 완벽한 페어링을 통해 전통주를 더욱
              깊이 있고 풍부하게 즐겨보세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContents;
