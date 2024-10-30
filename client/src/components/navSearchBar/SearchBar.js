import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };
  return (
    <>
      {/* <img src="/images/search-icon.png" className="search-icon" /> */}

      <input
        type="text"
        placeholder="원하는 술을 검색해 보세요!"
        onChange={handleInputChange}
        style={{
          width: "50%", // 너비를 줄여서 중앙에 위치하도록 설정
          padding: "10px",
          fontSize: "16px",
          borderRadius: "24px",
          border: "1px solid #ddd",
          marginBottom: "60px",
          margin: "0 auto", // input을 중앙 정렬
          display: "block", // 중앙 정렬을 위해 display를 block으로 설정
          boxSizing: "border-box",
          paddingLeft: "20px",
        }}
      />
    </>
  );
};

export default SearchBar;
