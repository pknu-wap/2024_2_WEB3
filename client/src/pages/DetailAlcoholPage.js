import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { styled } from "styled-components";
import alcoholData from "../api/alcoholData.json";
import { useParams } from "react-router-dom";

const DetailAlcoholPage = () => {
  const { id } = useParams();
  const alcohol = alcoholData[id];
  const savedAlcohol = JSON.parse(localStorage.getItem("selectedAlcohol"));

  return (
    <div>
      <Header />
      <Wrapper>
        <Content>
          <LeftContent>
            <ProductImage src={savedAlcohol.postImage} alt="Alcohol Product" />
          </LeftContent>
          <RightContent>
            <Title>{savedAlcohol.drinkName}</Title>
            <Details>
              <DetailItem>
                <DetailLabel>종류</DetailLabel>
                <DetailValue>{savedAlcohol.type}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>알코올 도수</DetailLabel>
                <DetailValue>{savedAlcohol.preferenceLevel}도</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>용량</DetailLabel>
                <DetailValue>{alcohol.ml}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>소개</DetailLabel>
                <DetailValue>{alcohol.intro}</DetailValue>
              </DetailItem>
              <DetailItem2>
                <DetailLabel>어울리는 안주</DetailLabel>
                <AnjuWrapper>
                  {alcohol.anju.map((anju) => (
                    <AnjuItem key={anju}>
                      <img src={"/anju/" + anju + ".png"} />
                    </AnjuItem>
                  ))}
                </AnjuWrapper>
              </DetailItem2>
            </Details>
          </RightContent>
        </Content>
        <BG src="/images/bg.png" />
      </Wrapper>
      <Footer />
    </div>
  );
};

const BG = styled.img`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 80vh;
  z-index: 1;
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

  &:nth-child(odd) {
    align-self: flex-start;
  }

  &:nth-child(even) {
    align-self: flex-end;
  }
`;

const AnjuWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin-top: 62px;
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
`;

const LeftContent = styled.div`
  background-color: #fff;
  padding-top: 200px;
  width: 42%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  max-width: 300px;
  height: auto;
  object-fit: contain;
  z-index: 2;
`;

const RightContent = styled.div`
  background-color: #f2eee7;
  width: 58%;
  display: flex;
  flex-direction: column;
  padding: 200px 77px 20px 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  background-color: #d9d9d9;
  border-radius: 28px;
  padding: 5px 20px;
`;

const Details = styled.div`
  margin-bottom: 20px;
`;
const DetailItem2 = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 5px;
`;

const DetailItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 5px;
`;

const DetailLabel = styled.span`
  z-index: 2;
  font-weight: bold;
  color: #555;
  width: 120px;
  min-width: 120px;
  border-right: 1px solid #000;
  height: 23px;
  max-height: 23px;
  margin-right: 20px;
`;

const DetailLabel2 = styled.span`
  font-weight: bold;
  color: #555;
  width: 120px;
  min-width: 100px;
  height: 23px;
  max-height: 23px;
  margin-right: 20px;
  position: absolute;
  top: 20px;
  left: 38%;
`;

const DetailValue = styled.span`
  z-index: 2;
  color: #333;
`;

export default DetailAlcoholPage;