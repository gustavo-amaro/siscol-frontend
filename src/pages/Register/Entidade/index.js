import React from "react";

import { Container, LoginBox, Form, SideBox } from "./styles";

import api from "../../../services/api";
import { useState } from "react";
import { Redirect } from "react-router-dom";

function RegisterEntidade() {
  const [toMain, setToMain] = useState(false);

  async function handleSubmitRegister(e) {
    e.preventDefault();
    const data = {
      nome: e.target.nome.value,
      cnpj: e.target.cnpj.value,
    };

    const jsonData = JSON.stringify(data);
    const token = localStorage.getItem("_token");

    const config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const responsavelId = localStorage.getItem("responsavel_id");
    const response = await api.post(
      `/entidades/store/${responsavelId}`,
      jsonData,
      config
    );
    if (response.status === 200) {
      localStorage.removeItem("responsavel_id");
      localStorage.setItem("entidade_id", response.data.id);
      let user = JSON.parse(localStorage.getItem("user"));
      localStorage.removeItem("user");
      user.entidade_id = response.data.id;

      await api.post(`/users/update/${user.id}`, JSON.stringify(user), config);
      setToMain(true);
    }
  }

  if (toMain) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <LoginBox>
        <SideBox className="secondary">
          <span>
            Informe os dados da entidade:
            <br />
            <br />
          </span>
        </SideBox>
        <Form onSubmit={handleSubmitRegister}>
          <div className="input-field" style={{ width: "75%" }}>
            <input id="first_name" name="nome" type="text" autoComplete="off" />
            <label htmlFor="first_name">Nome da entidade</label>
          </div>
          <div className="input-field" style={{ width: "75%" }}>
            <input id="cnpj" name="cnpj" type="text" autoComplete="off" />
            <label htmlFor="cnpj">CNPJ da Entidade</label>
          </div>
          <button
            type="submit"
            className="btn"
            style={{ background: "#682ab5", width: "70%" }}
          >
            Próximo
          </button>
        </Form>
      </LoginBox>
    </Container>
  );
}

export default RegisterEntidade;
