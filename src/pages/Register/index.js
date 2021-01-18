import React from "react";

import { Container, LoginBox, Form, SideBox } from "./styles";

import api from "../../services/api";
import { useState } from "react";
import { Redirect, Link } from "react-router-dom";

export default function Login() {
  const [toResponsavel, setToResponsavel] = useState(false);
  const [password, setPassword] = useState("");

  async function handleSubmitRegister(e) {
    e.preventDefault();
    const data = {
      nome: e.target.nome.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: "ADMIN",
    };
    const passwordRepeat = e.target.passwordRepeat.value;
    if (passwordRepeat !== data.password) {
      alert("As senhas não estão iguais!");
      return;
    }
    const jsonData = JSON.stringify(data);
    const config = {
      headers: { "content-type": "application/json" },
    };
    const response = await api.post("/users/register", jsonData, config);
    if (response.status === 200) {
      let user = response.data.user;
      user.password = password;
      localStorage.setItem("_token", response.data.token);
      localStorage.setItem("user_name", response.data.user.nome);
      localStorage.setItem("user", JSON.stringify(user));
      setToResponsavel(true);
    }
  }

  function checkPassword(e) {
    const helperText = document.querySelectorAll(".helper-text")[1];
    if (e.target.value === password) {
      helperText.innerHTML = "Ok";
      helperText.style.color = "#4CAF50";
    } else {
      helperText.innerHTML = "As senhas não coincidem!";
      helperText.style.color = "#F44336";
    }
  }

  if (toResponsavel) {
    return <Redirect to="/register/responsavel" />;
  }

  return (
    <Container>
      <LoginBox>
        <SideBox className="secondary">
          <span>
            Informe os dados para se cadastrar no sistema:
            <br />
            <br />
          </span>
          <span>
            Já tem cadastro? Então <Link to="/login">Entre</Link> no sistema.
          </span>
        </SideBox>
        <Form onSubmit={handleSubmitRegister}>
          <div className="input-field" style={{ width: "75%" }}>
            <input id="first_name" name="nome" type="text" autoComplete="off" />
            <label htmlFor="first_name">Nome</label>
          </div>
          <div className="input-field" style={{ width: "75%" }}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              className="validate"
            />
            <label htmlFor="email">Email</label>
            <span
              className="helper-text"
              data-error="Email inválido"
              data-success="Ok"
            ></span>
          </div>
          <div className="input-field" style={{ width: "75%" }}>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Senha</label>
          </div>
          <div className="input-field" style={{ width: "75%" }}>
            <input
              id="passwordRepeat"
              name="passwordRepeat"
              type="password"
              onChange={checkPassword}
            />
            <label htmlFor="passwordRepeat">Digite a senha novamente</label>
            <span
              className="helper-text"
              data-error="As senhas não coincidem!"
              data-success="Ok"
            ></span>
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
