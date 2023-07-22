import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';

//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './screens/Home';
import AdminHomepage from './screens/AdminHomepage';
import AdminFloorDesign from "./pages/adminFloorDesign";

const App = () => {
  return (
    <>

      {<BrowserRouter>
        <Routes>
        
          <Route path="/" element={<Home />} />

          <Route
            path="/admin-design-floor/:floor"
            element={<AdminFloorDesign />}
          />
          <Route
            path="/admin"
            element={<AdminHomepage />}
          />

        </Routes>
      </BrowserRouter>}



    </>
  );
};


export default App;
