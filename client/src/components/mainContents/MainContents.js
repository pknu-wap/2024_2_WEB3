import "./MainContents.css";
import { Link } from "react-router-dom";

const MainContents = () => {
  return (
    <div className="MainContents">
      <div className="banner-section">
        <img src="/images/banner-img.png" className="banner-img" />
        <div className="banner-wrap">
          <div className="banner-title">홀짝, 우리 술과 함께하는 공간</div>
          <div className="banner-text">
            우리 술에 담긴 이야기를 알고 계시나요? 전통주는 각 지역의 풍토와
            시간이 빚어낸 특별한 술입니다. <br />
            다채로운 우리 술 속에서 나만의 취향을 찾고 홀짝에서 나를 위한 특별한
            한 잔을 발견해 보세요!
            <br />
          </div>
        </div>
        <img src="/images/background-img2.jpg" className="background-img" />
      </div>

      <div className="category-section">
        <div className="category-title">
          다채로운 전통주 한 잔, 홀짝 맛보는 즐거움
        </div>
        <div className="category-container">
          <div className="category-imgbox category-imgbox1">
            <Link to="/cheongtakju">
              <img
                src="/images/liquor1.jpg"
                className="liquor-image liquor-image1"
              />
            </Link>
            <div className="caption">
              <span>쌀과 물로 빚어낸 맑은 술, 청주</span>
              <br />
              청주는 빛깔이 맑고 투명해 '맑은 술'로 불리며, 쌀을 발효해 은은한
              향과 부드러운 맛을 자랑합니다.
            </div>
          </div>

          <div className="category-imgbox category-imgbox2">
            <Link to="/cheongtakju">
              <img
                src="/images/liquor2.jpg"
                className="liquor-image liquor-image2"
              />
            </Link>
            <div className="caption">
              <span>부드럽고 진한 맛, 전통의 탁주</span>
              <br />
              탁주는 쌀과 누룩으로 만든 걸쭉한 전통주로, 고소하고 깊은 맛이
              특징입니다. 신선한 발효 향이 어우러져 풍미가 깊습니다.
            </div>
          </div>

          <div className="category-imgbox category-imgbox3">
            <Link to="/fruitWine">
              <img
                src="/images/liquor3.jpg"
                className="liquor-image liquor-image3"
              />
            </Link>
            <div className="caption">
              <span>과일의 향과 맛을 담은 술, 과실주</span> <br />
              과실주는 매실, 복숭아, 오미자 등 다양한 과일로 만든 전통주로,
              과일의 상큼한 향과 맛을 즐길 수 있습니다.
            </div>
          </div>
        </div>
      </div>

      <div className="bookmark-section">
        <div className="bookmark-title">
          내가 기억하고 싶은 한 잔, 나만의 리스트 저장
        </div>
        <div className="bookmark-container">
          <img
            src="https://cdn-icons-png.freepik.com/256/1753/1753035.png?uid=R169101181&ga=GA1.1.2009468932.1727855191&semt=ais_hybrid"
            className="bookmark-image"
          />

          <div className="bookmark-desc">
            <div className="bm-desc1">
              <h4>북마크 하기</h4>
              마음에 드는 술을 발견하면 북마크 버튼을 눌러 리스트에 추가하세요.
              <br />
              저장된 전통주는 마이 페이지에서 다시 찾아볼 수 있습니다. <br />
              북마크를 통해 좋아하는 전통주와 관심 있는 술을 간편하게 관리하고
              <br />
              나만의 전통주 컬렉션을 만들어가세요!
            </div>
            <div className="bm-desc2">
              <h4>선호 도수 설정하기</h4>
              마이페이지에서 나만의 선호 도수를 설정해 보세요.
              <br />
              좋아하는 도수를 설정해두고 전통주를 고를 때 기준을 세울 수
              있습니다.
              <br />
              도수에 대한 나만의 선호도를 기록하며 전통주 탐색의 즐거움을
              더해보세요.
            </div>
          </div>
        </div>
      </div>

      <div className="pairing-section">
        <div className="pairing-title">
          전통주와 어울리는 완벽한 안주를 만나보세요.
        </div>
        <div className="pairing-container">
          <img
            src="https://cdn-icons-png.freepik.com/256/2960/2960456.png?uid=R169101181&ga=GA1.1.2009468932.1727855191&semt=ais_hybrid"
            className="pairing-image"
          />

          <div className="pairing-desc">
            선택한 전통주와 가장 잘 어울리는 안주를 추천받아 보세요! <br />
            각 전통주의 특성에 맞춘 안주를 제안하여, <br />
            술과 안주가 조화를 이루는 최상의 맛을 경험해 보세요. <br />술 한
            잔과 안주 한 접시의 완벽한 페어링을 통해
            <br /> 전통주를 더욱 깊이 있고 풍부하게 즐겨보세요.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContents;
