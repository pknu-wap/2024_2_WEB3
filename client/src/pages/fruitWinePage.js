import Header from "../components/common/Header";
import { Link } from "react-router-dom";

const FruitWinePage = () => {
  return (
    <div>
      <Header />
      <div>
        <h5>과실주 목록</h5>
        <Link to={`/fruitWine/${"1"}`}>{"과실주1"}</Link>
      </div>
    </div>
  );
};

export default FruitWinePage;
