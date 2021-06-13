import React from "react";
import TopBar from "./topbar";

function Template({ children }) {
  return (
    <div className="App">
      <TopBar />
      <div className="content">
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}

export default Template;
