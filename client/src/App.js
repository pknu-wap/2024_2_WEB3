import "./App.css";
import MainPage from "./pages/MainPage";
import CheongtakjuPage from "./pages/CheongtakjuPage";
import FruitWinePage from "./pages/fruitWinePage";
import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cheongtakju" element={<CheongtakjuPage />} />{" "}
          {/* 청탁주 리스트 페이지 */}
          <Route path="/fruitWine" element={<FruitWinePage />} />{" "}
          {/* 과실주 리스트 페이지 */}
          <Route path="/signIn" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
