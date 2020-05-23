import React from "react";
import Sidebar from "./sidebar";
import TopBar from "./topbar";
import Footer from "./footer";

function Template({ children }) {
  return (
    <div className="App">
      <Sidebar />
      <div className="content">
        <TopBar />
        <div className="main-content">{children}</div>
        <Footer />
      </div>
    </div>
  );
}

export default Template;
