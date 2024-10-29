import Header from "../components/common/Header";
import { Link } from "react-router-dom";

const CheongtakjuPage = () => {
  return (
    <div>
      <Header />
      <div>
        <h5>청탁주 목록</h5>
        <Link to={`/cheongtakju/${"1"}`}>{"탁주1"}</Link>
      </div>
    </div>
  );
};

export default CheongtakjuPage;
