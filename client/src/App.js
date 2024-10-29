import "./App.css";
import MainPage from "./pages/MainPage";
import CheongtakjuPage from "./pages/CheongtakjuPage";
import FruitWinePage from "./pages/fruitWinePage";
import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import Mypage from "./pages/mypage";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
