import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MenuBar from "./MenuBar";
import { RootState, useAppDispatch } from "../../store/configureStore";
import { useSelector } from "react-redux";
import { fetchCategoryAsync } from "./danhmucSlice";
import { fetchMinistryAsync } from "./ministrySlice";

const ListMenuBar = () => {

//   const dispatch = useAppDispatch();

//   const { isLoading, data, status } = useSelector(
//     (state: RootState) => state.categories
//   );
// //  console.log("{ isLoading," , data, "status }")
//  useEffect(() => {
//   dispatch(fetchCategoryAsync());
//   dispatch(fetchMinistryAsync());
// }, [dispatch]);
  

//   const sortedData = [...data.Data].sort((a, b) => {
//     if (a.Default_MarketWatch === "1") return -1;
//     if (b.Default_MarketWatch === "1") return 1;
//     return 0;
//   });
  return (
    <div>
      <MenuBar />
    </div>
  );
};

export default ListMenuBar;