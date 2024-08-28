import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import BookMark from "../BookMark/BookMark";
import Map from "../Map/Map";
import Search from "../Search/Search";
function Routing() {
  return (
    <div>
     <Routes>
      <Route path="/" element={< Home/>} />
      <Route path="/map" element={< Map/>} />
      <Route path="/BookMark" element={< BookMark/>} />
      <Route path="/search" element={< Search/>} />
    </Routes>
    </div>
  );
}

export default Routing;
