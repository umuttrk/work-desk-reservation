import './App.css';
import React  from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './screens/Home';
import AdminPage from './screens/AdminPage';
import DeskReservationPage from './screens/DeskReservationPage';
import AdminFloorDesign from "./pages/adminFloorDesign";

const App = () => {
  return (
    <>
      {<BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />} />
          <Route
            path="/desk-reservation/:floor"
            element={<DeskReservationPage />} />

          <Route
            path="/admin-design-floor/:floor"
            element={<AdminFloorDesign />}
          />
          <Route
            path="/admin"
            element={<AdminPage />}
          />
        </Routes>
      </BrowserRouter>}
    </>
  );
};


export default App;
