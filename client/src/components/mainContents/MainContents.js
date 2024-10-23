import "./MainContents.css";

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

      <div className="category-section"></div>
      <div className="bookmark-section"></div>
      <div className="pairing-section"></div>
    </div>
  );
};

export default MainContents;
