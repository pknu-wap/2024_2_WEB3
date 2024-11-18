import "./MainContents.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";
import Footer from "../common/Footer";

const MainContents = () => {
  return (
    <div className="MainContents">
      <div className="banner-section">
        <img src="/images/banner-img-figma.png" className="background-img" />
      </div>

      <div className="contents-section">
        <p>aefaefasfef</p>
        <p>aefaefasfef</p>
        <p>aefaefasfef</p>
        <p>aefaefasfef</p>
      </div>

      {/* <div className="category-section"></div>
      <div className="bookmark-section"></div>
      <div className="pairing-section"></div> */}

      {/* footer 여기 추가? */}
    </div>
  );
};

export default MainContents;
