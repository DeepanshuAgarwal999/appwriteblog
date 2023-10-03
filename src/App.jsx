import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { Footer, Header } from "./components";
import { login, logout } from "./store/authSlice";
const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("SomeThing Went Wrong in frontend part", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return loading ? null : (
    <div className="min-h-screen flex flex-wrap content-between bg-slate-900">
      <div className="w-full text-center text-white block">
        <Header />
        <main className="text-black h-[130vh]"><Outlet/></main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
