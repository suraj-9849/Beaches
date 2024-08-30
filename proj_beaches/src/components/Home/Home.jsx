
import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Hero from "./Hero";
import DescriptionDivs from "./DescriptionDivs";

const Home = () => {
  return (
    <div className="h-[200vh] flex flex-col ">
      <Navbar />
      <Hero />
      <DescriptionDivs
        data={"Events"}
      />
      <DescriptionDivs
        data={"Search"}
      />
      <DescriptionDivs
        data={"MapView"}
      />
      <Footer />
    </div>
  );
};

export default Home;
