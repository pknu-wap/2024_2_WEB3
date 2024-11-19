import "./App.css";
import MainPage from "./pages/MainPage";
import CheongtakjuPage from "./pages/CheongtakjuPage";
import FruitWinePage from "./pages/FruitWinePage";
import SignInPage from "./pages/SignInPage";
import Mypage from "./pages/mypage";
import SignUpPage from "./pages/SignUpPage";
import DetailAlcoholPage from "./pages/DetailAlcoholPage";
import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cheongtakju" element={<CheongtakjuPage />} />{" "}
          <Route path="/fruitWine" element={<FruitWinePage />} />{" "}
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/alcohol/:id" element={<DetailAlcoholPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
