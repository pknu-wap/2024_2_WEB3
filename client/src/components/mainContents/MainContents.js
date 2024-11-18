import "./MainContents.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";
import { motion, useInView } from "framer-motion";

const MainContents = () => {
  const [offsetImg, setOffsetImg] = useState(0); // 배경 이미지의 offset
  const [offsetText, setOffsetText] = useState(0); // 텍스트의 offset

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // 배경 이미지의 패럴랙스 효과 (더 빠르게)
      const maxOffsetImg = 500;
      setOffsetImg(Math.min(scrollPosition * 1.02, maxOffsetImg));

      // 텍스트의 패럴랙스 효과 (더 느리게)
      const maxOffsetText = 500;
      setOffsetText(Math.min(scrollPosition * 0.15, maxOffsetText));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 각 애니메이션 요소에 커스텀 훅 사용
  const [refCategoryTitle, categoryTitleProps] = useScrollFadeIn();

  return (
    <div className="MainContents">
      <div className="banner-section">
        <img src="/images/banner-img-figma.png" className="background-img" />
      </div>

      <div className="category-section"></div>

      <div className="bookmark-section">
        <motion.div
          className="category-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          기억하고 싶은 한 잔, 나만의 리스트 저장
        </motion.div>
        <div className="bookmark-container">
          <img
            src="https://cdn-icons-png.freepik.com/256/1753/1753035.png?uid=R169101181&ga=GA1.1.2009468932.1727855191&semt=ais_hybrid"
            className="bookmark-image"
          />

          <div className="bookmark-desc">
            <div className="bm-desc1">
              <h4>북마크 하기</h4>
              마음에 드는 술을 발견하면 북마크 버튼을 눌러 리스트에 추가하세요.
              <br />
              저장된 전통주는 마이 페이지에서 다시 찾아볼 수 있습니다. <br />
              북마크를 통해 좋아하는 전통주와 관심 있는 술을 간편하게 관리하고
              <br />
              나만의 전통주 컬렉션을 만들어가세요!
            </div>
            <div className="bm-desc2">
              <h4>선호 도수 설정하기</h4>
              마이페이지에서 나만의 선호 도수를 설정해 보세요.
              <br />
              좋아하는 도수를 설정해두고 전통주를 고를 때 기준을 세울 수
              있습니다.
              <br />
              도수에 대한 나만의 선호도를 기록하며 전통주 탐색의 즐거움을
              더해보세요.
            </div>
          </div>
        </div>
      </div>

      <div className="pairing-section">
        <motion.div
          className="category-title"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          전통주와 어울리는 완벽한 안주를 만나보세요.
        </motion.div>
        <div className="pairing-container">
          <img
            src="https://cdn-icons-png.freepik.com/256/2960/2960456.png?uid=R169101181&ga=GA1.1.2009468932.1727855191&semt=ais_hybrid"
            className="pairing-image"
          />

          <div className="pairing-desc">
            선택한 전통주와 가장 잘 어울리는 안주를 추천받아 보세요! <br />
            각 전통주의 특성에 맞춘 안주를 제안하여, <br />
            술과 안주가 조화를 이루는 최상의 맛을 경험해 보세요. <br />술 한
            잔과 안주 한 접시의 완벽한 페어링을 통해
            <br /> 전통주를 더욱 깊이 있고 풍부하게 즐겨보세요.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContents;
