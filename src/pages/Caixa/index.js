import React from "react";
import { FaDollarSign, FaShoppingCart } from "react-icons/fa";

import { ButtonHeader, Container, Header } from "./styles";

function Caixa() {
  return (
    <Container>
      <Header>
        <ButtonHeader className="success">
          <FaShoppingCart style={{ marginRight: 8 }} /> Compra de pescado
        </ButtonHeader>
        <ButtonHeader className="warning">
          <FaDollarSign style={{ marginRight: 8 }} /> Venda de pescado
        </ButtonHeader>
      </Header>
    </Container>
  );
}

export default Caixa;
