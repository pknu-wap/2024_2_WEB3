import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import alcoholData from "../api/alcoholData.json"; // JSON 파일 import
import { styled } from "styled-components";

const DetailAlcoholPage = () => {
  const { id } = useParams();
  const [alcoholFromBackend, setAlcoholFromBackend] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    async function fetchAlcoholData() {
      try {
        const response = await fetch(
          `https://foreign-papagena-wap2024-2-web3-0d04a01a.koyeb.app/api/post/info/${id}`
        );
        const result = await response.json();

        if (result.code === "200") {
          setAlcoholFromBackend(result.data);
        } else {
          console.error(result.message || "데이터를 불러오지 못했습니다.");
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    }

    fetchAlcoholData();
  }, [id]);

  const alcoholFromJson = alcoholData[id];
  const alcohol = alcoholFromBackend
    ? {
        ...alcoholFromJson,
        ...alcoholFromBackend,
      }
    : alcoholFromJson;

  if (loading) {
    return (
      <LoadingWrapper>
        <Logo src="/images/Holjjak-logo.png" alt="Loading Logo" />
      </LoadingWrapper>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <Header />
      <Wrapper>
        <Content>
          <LeftContent>
            <ProductImage
              src={alcohol.postImage || "/images/default-image.png"}
              alt="Alcohol Product"
            />
          </LeftContent>
          <RightContent>
            <Title>{alcohol.drinkName}</Title>
            <Details>
              <DetailItem>
                <DetailLabel>종류</DetailLabel>
                <DetailValue>{alcohol.type}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>알코올 도수</DetailLabel>
                <DetailValue>
                  {alcohol.preferenceLevel || alcohol.alcoholLevel}도
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>용량</DetailLabel>
                <DetailValue>{alcohol.ml}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>소개</DetailLabel>
                <DetailValue>{alcohol.intro}</DetailValue>
              </DetailItem>
              {alcohol.anju && (
                <DetailItem2>
                  <DetailLabel>어울리는 음식</DetailLabel>
                  <AnjuWrapper>
                    {alcohol.anju.map((anju) => (
                      <AnjuItem key={anju}>
                        <img src={`/anju/${anju}.png`} alt={anju} />
                      </AnjuItem>
                    ))}
                  </AnjuWrapper>
                </DetailItem2>
              )}
            </Details>
          </RightContent>
        </Content>
      </Wrapper>
      <FooterWrapper>
        <Footer />
        <FooterImg>
          <img src="/images/bg2.png" alt="footer-img" />
        </FooterImg>
      </FooterWrapper>
    </div>
  );
};

export default DetailAlcoholPage;

// Styled Components

const Logo = styled.img`
  width: 80px;
  height: 80px;
  animation: blink 1.5s infinite;

  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f9f5ef;
`;

const FooterImg = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  margin: 0;
  padding: 0;
  opacity: 0.8;

  & img {
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;

const FooterWrapper = styled.div`
  position: relative;
  z-index: 1;
  background-color: #fff;
  padding: 20px;
`;

const LoadingText = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #555;
  animation: blink 1.5s infinite;

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 130vh;
  display: flex;
  flex-direction: column;
  background-color: #f9f5ef;
`;

const Content = styled.div`
  margin-top: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const LeftContent = styled.div`
  padding-top: 200px;
  width: 42%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;
`;

const ProductImage = styled.img`
  max-width: 300px;
  height: auto;
  object-fit: contain;
  position: absolute;
  top: 200px;
`;

const RightContent = styled.div`
  background-color: #f2eee7;
  width: 58%;
  display: flex;
  height: 130vh;
  flex-direction: column;
  padding: 200px 77px 20px 20px;
`;

const Title = styled.h1`
  z-index: 3;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  background-color: #d4cdc1;
  border-radius: 28px;
  padding: 5px 20px;
`;

const Details = styled.div`
  margin-bottom: 20px;
  z-index: 3;
`;

const DetailItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 5px;
`;

const DetailLabel = styled.span`
  font-weight: bold;
  color: #555;
  width: 120px;
  min-width: 120px;
  border-right: 1px solid #000;
  height: 23px;
  max-height: 23px;
  margin-right: 20px;
`;

const DetailValue = styled.span`
  color: #333;
`;

const DetailItem2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 5px;
`;

const AnjuWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
  align-items: center;
  flex-direction: column;
`;

const AnjuItem = styled.div`
  z-index: 2;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  position: relative;

  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
  }

  /* 홀수 아이템을 위쪽으로 이동 */
  &:nth-child(odd) {
    align-self: flex-start;
    transform: translateY(-10px);
  }

  /* 짝수 아이템을 아래쪽으로 이동 */
  &:nth-child(even) {
    align-self: flex-end;
    transform: translateY(10px);
  }
`;
