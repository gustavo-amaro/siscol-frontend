import React, { useEffect } from "react";

import { ButtonAction, Container } from "./styles";
import api from "../../services/api";

export default function Main() {
  useEffect(() => {
    //para verificação de autenticação
    async function getTotalFiliados() {
      await api.get("/pescadores/registros/total");
    }
    getTotalFiliados();
  }, []);

  return (
    <Container className="container">
      <h1 className="text-center">O que deseja fazer?</h1>
      <div className="row">
        <div className="col-md-4 col-sm-12 d-flex justify-content-center mb-3">
          <ButtonAction delay={600} className="btn btn-primary">RECOLHIMENTO DE ANUIDADE</ButtonAction>
        </div>
        <div className="col-md-4 col-sm-12 d-flex justify-content-center mb-3">
          <ButtonAction delay={700} className="btn btn-primary">VER PESCADORES</ButtonAction>
        </div>
        <div className="col-md-4 col-sm-12 d-flex justify-content-center">
          <ButtonAction delay={800} className="btn btn-primary">VENDER/COMPRAR PESCADO</ButtonAction>
        </div>
      </div>

      <img
          id="logo-login"
          className="logo-bottom"
          src={require("../../assets/logo-dark.png")}
          alt="logo siscol"
        />
    </Container>
  );
}
