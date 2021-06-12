import React from "react";

import { Container, Form, FooterBox } from "./styles";

import api from "../../services/api";
import { FaLock, FaUser } from "react-icons/fa";

export default function Login() {
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
      window.location.href = "/";
    }
  }
  return (
    <Container>
      <img
        id="logo-login"
        src={require("../../assets/logo-branca.png")}
        alt="logo siscol"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Form onSubmit={handleSubmitLogin}>
          <div className="mb-3 input-group">
            <span class="input-group-text" id="basic-addon1">
              <FaUser />
            </span>
            <input
              id="first_name"
              className="form-control"
              name="email"
              type="text"
              autoComplete="off"
              placeholder="E-mail"
            />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <FaLock />
            </span>
            <input
              id="last_name"
              name="password"
              className="form-control"
              type="password"
              placeholder="Senha"
            />
          </div>

          <button
            style={{ width: "100%", fontSize: 24 }}
            type="submit"
            className="btn btn-primary"
            title="Fazer login"
          >
            Entrar
          </button>
        </Form>
        <FooterBox id="kadjflaj" className="secondary">
          <span>
            Não possui uma conta?
            <br />
            Registre-se gratuitamente.
          </span>
        </FooterBox>
      </div>
    </Container>
  );
}
