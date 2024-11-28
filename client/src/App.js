import "./App.css";
import MainPage from "./pages/MainPage";
import ListPage from "./pages/ListPage";
import SignInPage from "./pages/SignInPage";
import Mypage from "./pages/mypage";
import SignUpPage from "./pages/SignUpPage";
import DetailAlcoholPage from "./pages/DetailAlcoholPage";
import SearchPage from "./components/search/search";
import ResultsPage from "./pages/searchresult";

import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/list/:category" element={<ListPage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/" element={<SearchPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/alcohol/:id" element={<DetailAlcoholPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;