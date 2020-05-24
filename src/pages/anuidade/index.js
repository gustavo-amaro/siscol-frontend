import React from "react";

import { Container } from "./styles";

import { Link } from "react-router-dom";

import { FaPlusSquare } from "react-icons/fa";

function anuidade() {
  return (
    <Container className="container-fluid">
      <h2>Anuidades</h2>
      <Link className="btn primary" to="/nova-guia">
        <FaPlusSquare /> Nova anuidade
      </Link>
    </Container>
  );
}

export default anuidade;
