import Header from "../components/common/Header";
import { Link } from "react-router-dom";
import SearchBar from "../components/navSearchBar/SearchBar";
import AlcoholList from "../components/alcoholList/AlcoholList";
import { useState } from "react";

const alcoholsData = [
  {
    id: 1,
    name: "",
    description: "",
    image: "",
  },
  {
    id: 2,
    name: "",
    description: "",
    image: "",
  },
  {
    id: 3,
    name: "",
    description: "",
    image: "",
  },
  {
    id: 4,
    name: "",
    description: "",
    image: "",
  },
  {
    id: 5,
    name: "",
    description: "",
    image: "",
  },
  {
    id: 6,
    name: "",
    description: "",
    image: "",
  },
  {
    id: 7,
    name: "",
    description: "",
    image: "",
  },
  {
    id: 8,
    name: "",
    description: "",
    image: "",
  },
  {
    id: 9,
    name: "",
    description: "",
    image: "",
  },
  {
    id: 10,
    name: "",
    description: "",
    image: "",
  },
];

const FruitWinePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredAlcohols = alcoholsData.filter((alcohol) =>
    alcohol.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div style={{ width: "80%", margin: "6% auto", paddingTop: "20px" }}>
        <SearchBar onSearch={setSearchTerm} />
        <AlcoholList alcohols={filteredAlcohols} />
      </div>
    </div>
  );
};

export default FruitWinePage;
