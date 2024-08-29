import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Hero from "./Hero";
import DescriptionDivs from "./DescriptionDivs";

const Home = () => {
  return (
    <div className="h-[250vh] flex flex-col ">
      <Navbar />
      <Hero />
      <hr />
      <DescriptionDivs
        data={"Events"}
      />
      <hr />
      <DescriptionDivs
        data={"Search"}
      />
      <hr />
      <DescriptionDivs
        data={"MapView"}
      />
      <Footer />
    </div>
  );
};

export default Home;
