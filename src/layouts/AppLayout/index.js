import React from "react";
import TopBar from "./topbar";

import {Container} from './styles'
function Template({ children }) {
  return (
    <Container>
      <TopBar />
      {children}
    </Container>
  );
}

export default Template;
