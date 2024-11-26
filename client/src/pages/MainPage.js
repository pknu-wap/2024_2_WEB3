import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import MainContents from "../components/mainContents/MainContents";

const MainPage = () => {
  return (
    <div className="MainPage">
      <Header />
      <MainContents />
      <Footer />
    </div>
  );
};

export default MainPage;
