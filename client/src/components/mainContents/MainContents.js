import "./MainContents.css";
import { Link } from "react-router-dom";

const MainContents = () => {
  return (
    <div className="MainContents">
      <div className="banner-section">
        <img src="/images/banner-img.png" className="banner-img" />
        <div className="banner-text">
          <h1>홀짝. 우리술과 함께하는 공간.</h1>
          <p>
            다양한 전통주를 탐색하고, 나만의 리스트를 만들어 보세요. 다양한
            전통주를 탐색하고, 나만의 리스트를 만들어 보세요. 다양한 전통주를
            탐색하고, 나만의 리스트를 만들어 봐라.다양한 전통주를 탐색하고,
            나만의 리스트를 만들어 보세요. 다양한 전통주를 탐색하고.
          </p>
        </div>
      </div>

      <div className="category-section">
        <div className="category-title">
          청탁주 한 잔, 과실주 한 잔, 홀짝 맛보는 즐거움!
        </div>
        <div className="category-container">
          <div className="category-imgbox category-imgbox1">
            <Link to="/cheongtakju">
              <img
                src="/images/liquor1.jpg"
                className="liquor-image liquor-image1"
              />
            </Link>
            <p className="caption">
              caption: SojuEat <br />
              막걸리. 땡긴다.
            </p>
          </div>

          <div className="category-imgbox category-imgbox2">
            <Link to="/cheongtakju">
              <img
                src="/images/liquor2.jpg"
                className="liquor-image liquor-image2"
              />
            </Link>
            <p className="caption">
              caption: sefasdfasefads <br />
              닭발 피자 마라탕 안심 돈까스
            </p>
          </div>

          <div className="category-imgbox category-imgbox3">
            <Link to="/fruitWine">
              <img
                src="/images/liquor3.jpg"
                className="liquor-image liquor-image3"
              />
            </Link>
            <p className="caption">
              caption: sefasdfasefads <br />
              대방어 먹고싶어. 회쏘.
            </p>
          </div>
        </div>
      </div>

      <div className="bookmark-section">
        <div className="bookmark-title">
          좋아하는 술을 북마크하고 나만의 전통주 컬렉션을 완성하세요.
        </div>
        <div className="bookmark-container">
          <div className="bookmark-imgbox">
            {/* <img src="/images/sample1.png" className="bookmark-image" /> */}
            <img src="" className="" />
          </div>
          <div className="bookmark-desc">
            <h4>북마크 하기</h4>
            나만의 전통주를 저장하고 확인하세요! <br />
            선호 도수 설정 후 저장하기
            <h4>도수 설정하기</h4>
            나만의 전통주를 저장하고 확인하세요! <br />
            선호 도수 설정 후 저장하기
          </div>
        </div>
      </div>

      <div className="pairing-section"></div>
    </div>
  );
};

export default MainContents;
