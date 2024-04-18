import Header from "../../components/Header/Header";
import ExploreMenu from "../ExploreMenu/ExploreMenu";
import { useState } from "react";

import "./Home.css";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
    </div>
  );
};

export default Home;
