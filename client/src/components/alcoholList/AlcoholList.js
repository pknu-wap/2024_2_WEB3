import "./AlcoholList.css";
import React, { useEffect, useState } from "react";
import cheongTakjuListApi from "../../api/cheongTakjuListApi";
import fruitWineListApi from "../../api/fruitWineListApi";

const AlcoholList = ({ fetchApi }) => {
  // const [alcoholList, setAlcoholList] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchApi(1); // 첫 페이지 데이터 호출
  //       setAlcoholList(data.postDtos);
  //     } catch (error) {
  //       console.error("데이터 가져오기 에러:", error.message);
  //     }
  //   };
  //   fetchData();
  // }, [fetchApi]);

  const [alcoholList, setAlcoholList] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const ITEMS_PER_PAGE = 10; // 한 페이지당 표시할 아이템 수

  // 페이지 변경 시 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchApi(page);
        setAlcoholList(data.postDto); // 데이터 설정
      } catch (error) {
        console.log("API 호출 중 에러 발생:", error.message);
      }
    };
    fetchData();
  }, [page]); // page 상태가 변경될 때마다 실행

  // 페이지네이션 핸들러
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1); // 다음 페이지로 이동
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1); // 이전 페이지로 이동
    }
  };

  // 임시 데이터
  const tempData = [
    {
      postImage: "https://via.placeholder.com/150x225",
      drinkName: "술 이름 1",
    },
    {
      postImage: "https://via.placeholder.com/150x225",
      drinkName: "술 이름 2",
    },
    {
      postImage: "https://via.placeholder.com/150x225",
      drinkName: "술 이름 3",
    },
    {
      postImage: "https://via.placeholder.com/150x225",
      drinkName: "술 이름 4",
    },
    {
      postImage: "https://via.placeholder.com/150x225",
      drinkName: "술 이름 5",
    },
    {
      postImage: "https://via.placeholder.com/150x225",
      drinkName: "술 이름 6",
    },
    {
      postImage: "https://via.placeholder.com/150x225",
      drinkName: "술 이름 7",
    },
    {
      postImage: "https://via.placeholder.com/150x225",
      drinkName: "술 이름 8",
    },
    {
      postImage: "https://via.placeholder.com/150x225",
      drinkName: "술 이름 9",
    },
    {
      postImage: "https://via.placeholder.com/150x225",
      drinkName: "술 이름 10",
    },
  ];

  return (
    <div className="AlcoholList">
      <div className="alcohol-container">
        {tempData.map((item, index) => (
          <div key={index} className="alcohol-item-wrap">
            <img
              src={item.postImage}
              alt={item.drinkName}
              className="alcohol-image"
            />
            <div className="alcohol-name">{item.drinkName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlcoholList;
