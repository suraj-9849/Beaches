import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import CreateEvent from '../Events/CreateEvent'
import Events from '../Events/Events'
import BookMark from "../BookMark/BookMark";
import Map from "../Map/Map";
import Search from "../Search/Search";
import Show from "../Show/Show";
import RegisterPage from "../RegisterPage";
import LoginPage from "../LoginPage";
import MainPage from "../MainPage";
import OrgRegPage from "../OrgRegPage";



function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/map" element={< Map />} />
        <Route path="/BookMark" element={< BookMark />} />
        <Route path="/search" element={< Search />} />
        <Route path="/createEvent" element={< CreateEvent />} />
        <Route path="/events" element={< Events />} />
        <Route path="/beach/:name" element={<Show />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/logged-in-state" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/org-register" element={<OrgRegPage/>}/>


      </Routes>
    </div>
  );
}

export default Routing;