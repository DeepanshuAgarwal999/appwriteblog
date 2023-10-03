import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    setLoader(false);
  }, [authStatus, navigate, authentication]);
 return loader ? <h1>Loading...</h1> : <>{children}</>;
}
