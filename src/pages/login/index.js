import React from "react";

import { Container, LoginBox, Form, SideBox } from "./styles";

import api from "../../services/api";
import { useState } from "react";
import { Redirect } from "react-router-dom";

export default function Login() {
  const [toMain, setToMain] = useState(false);

  async function handleSubmitLogin(e) {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const jsonData = JSON.stringify(data);
    const config = {
      headers: { "content-type": "application/json" },
    };
    const response = await api.post("/users/authenticate", jsonData, config);
    if (response.status === 200) {
      localStorage.setItem("_token", response.data.token);
      localStorage.setItem("entidade_id", response.data.user.entidade_id);
      localStorage.setItem("user_name", response.data.user.nome);
      setToMain(true);
    }
  }

  if (toMain) {
    return <Redirect to="/" />;
  }
  return (
    <Container>
      <LoginBox>
        <SideBox className="teal">
          <span>Realize o login para acessar o sistema: <br/><br/></span>
        </SideBox>
        <Form onSubmit={handleSubmitLogin}>
          <div className="input-field" style={{ width: "75%" }}>
            <input id="first_name" name="email" type="text" autoComplete="off"/>
            <label htmlFor="first_name">Email</label>
          </div>
          <div className="input-field" style={{ width: "75%" }}>
            <input id="last_name" name="password" type="password" />
            <label htmlFor="last_name">Senha</label>
          </div>
          <button
            type="submit"
            className="btn"
            style={{ background: "#682ab5", width: '70%'}}
          >
            Entrar
          </button>
        </Form>
      </LoginBox>
    </Container>
  );
}
