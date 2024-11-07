import "./App.css";
import MainPage from "./pages/MainPage";
import CheongtakjuPage from "./pages/CheongtakjuPage";
import FruitWinePage from "./pages/fruitWinePage";
import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import Mypage from "./pages/mypage";
import SearchPage from "./components/search/search";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cheongtakju" element={<CheongtakjuPage />} />{" "}
          <Route path="/fruitWine" element={<FruitWinePage />} />{" "}
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/mypage" element={<Mypage />} />
          {/* 과실주 리스트 페이지 */}
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
