import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchLoggedInUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/profile`,
        { withCredentials: true },
      );
      dispatch(addUser(response.data.data));
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      }
      console.log(error?.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-132px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Body;
