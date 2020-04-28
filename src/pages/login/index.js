import React from "react";

import { Container, LoginBox, Form } from "./styles";

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
      setToMain(true);
    }
  }

  if (toMain) {
    return <Redirect to="/" />;
  }
  return (
    <Container>
      <LoginBox>
        <Form onSubmit={handleSubmitLogin}>
          <div className="input-field" style={{ width: "75%" }}>
            <input id="first_name" name="email" type="text" />
            <label htmlFor="first_name">Email</label>
          </div>
          <div className="input-field" style={{ width: "75%" }}>
            <input id="last_name" name="password" type="password" />
            <label htmlFor="last_name">Senha</label>
          </div>
          <button
            type="submit"
            className="btn"
            style={{ background: "#682ab5", width: 140 }}
          >
            Entrar
          </button>
          Ou
          <button type="button" className="btn" style={{ width: 140 }}>
            Cadastre-se
          </button>
        </Form>
      </LoginBox>
    </Container>
  );
}
