import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MenuBar from "./MenuBar";
import { RootState, useAppDispatch } from "../../store/configureStore";
import { useSelector } from "react-redux";
import { fetchCategoryAsync } from "./danhmucSlice";
import { fetchMinistryAsync } from "./ministrySlice";

const ListMenuBar = () => {
  return (
    <div>
      <MenuBar />
    </div>
  );
};

export default ListMenuBar;