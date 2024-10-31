import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="SearchBar">
      {/* <img src="/images/search-icon.png" className="search-icon" /> */}
      <input type="text" placeholder="원하는 술을 검색해 보세요!" />
    </div>
  );
};

export default SearchBar;
