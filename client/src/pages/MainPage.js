import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import MainContents from "../components/mainContents/MainContents";
import "../styles/MainPage.css";

const MainPage = () => {
  return (
    <div className="MainPage">
      <Header />
      <MainContents />
      <Footer />
      <div className="main-footer">
        <img
          src="images/mainpage/main-footer.png"
          className="main-footer-img"
          alt="main-footer-img"
        />
      </div>
    </div>
  );
};

export default MainPage;
