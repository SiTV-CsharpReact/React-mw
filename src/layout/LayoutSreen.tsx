import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
const MainlayoutScreen = () => {
  return (
    <>
       <Header/>
     <Outlet /> 
    </>
  );
};
export default MainlayoutScreen;
