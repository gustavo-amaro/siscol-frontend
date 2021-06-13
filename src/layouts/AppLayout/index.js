import React from "react";
import TopBar from "./topbar";
import Sidebar from "./sidebar";

import {Container} from './styles'

import AppLayoutProvider from "../../contexts/AppLayoutContext";

function Template({ children }) {
  return (
    <AppLayoutProvider>
      <Sidebar />
      <Container>
        <TopBar />
        {children}
      </Container>
    </AppLayoutProvider>
  );
}

export default Template;
