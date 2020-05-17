import React from 'react';
import Sidebar from "./sidebar";
import TopBar from "./topbar";
import Footer from "./footer";

function Template({component}) {
    return (
    <div className="App">
        <Sidebar />
        <div className="content">
        <TopBar />
        <div className="main-content">
            {component}
        </div>
        <Footer />
        </div>
    </div>
  );
}

export default Template;