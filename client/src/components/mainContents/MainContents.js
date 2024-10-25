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
        <img src="/images/background-img2.jpg" className="background-img" />
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
            <div className="caption">
              청주
              <br />
              쌀로 빚어 맑게 걸러낸 깔끔한 전통주
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
              탁주 <br />쌀 발효로 만든 걸쭉한 전통주
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
              과실주 <br />
              감, 오미자 등 과일로 빚어 달콤한 향을 담은 술
            </div>
          </div>
        </div>
      </div>

      <div className="bookmark-section">
        <div className="bookmark-title">
          좋아하는 술을 북마크하고 나만의 전통주 컬렉션을 완성하세요.
        </div>
        <div className="bookmark-container">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJ
            bSJIAAAABlBMVEViY2diY2je0hv5AAAATklEQVR4nO3OMQEAAAwCINe/9Ar4+0ACEg
            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKhuHQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            IC9Byp4AAJDg6SjAAAAAElFTkSuQmCC"
            className="bookmark-image"
          />

          <div className="bookmark-desc">
            <div className="bm-desc1">
              <h4>북마크 하기</h4>
              나만의 전통주를 저장하고 확인하세요! 선호 도수 설정 후 저장하기
              <br />
              기장저 후 설정 수도 호선! 확인고 저장을 주통전 의만나
              <br />
              전통주 확인 저장 도수 설정 후 선호 나만의 저장하고세요!
              <br />
            </div>
            <div className="bm-desc2">
              <h4>도수 설정하기</h4>
              확인하세요! 선호 도수 나만의 전통주를 저장하고설정 후 저장하기
              <br />
              나만의 전통주를 저장하고 확인하세요! 선호 도수 설정 후 저장하기
              <br />
              기장저 후 설정 수도 호선! 확인고 저장을 주통전 의만나
              <br />
              전통주 확인 저장 도수 설정 후 선호 나만의 저장하고세요!
              <br />
            </div>
          </div>
        </div>
      </div>

      <div className="pairing-section"></div>
    </div>
  );
};

export default MainContents;
