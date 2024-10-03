import "./App.css";
import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail1" element={""} />
          <Route path="/detail2" element={""} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
