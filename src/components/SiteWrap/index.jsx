import React, { useState } from "react";
import styles from "./styles.module.scss";
import About from "../../pages/About";
import Auth from "../../pages/Auth";
import NewDocFlow from "../../pages/NewDocFlow";
import { Nav } from "../Nav";
import { useLocation } from "react-router-dom";

export const SiteWrap = ({ children }) => {
  const location = useLocation();
  const showAuth = location.pathname !== "/login";

  return (
    <div>
      <Nav />
      <main>{children}</main>
    {showAuth && (
      <Auth />
    )}
      <NewDocFlow />
      <About />
    </div>
  )
};
