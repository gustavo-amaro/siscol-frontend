import React, { useState } from "react";

import { Container, Form, FooterBox, LoginBox } from "./styles";

import api from "../../services/api";
import { FaLock, FaUser } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

export default function Login(props) {
  const [loading, setLoading] = useState(false);
  const [messageUser, setMessageUser] = useState("");

  async function handleSubmitLogin(e) {
    e.preventDefault();
    setLoading(true);
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const jsonData = JSON.stringify(data);
    const config = {
      headers: { "content-type": "application/json" },
    };

    api
      .post("/users/authenticate", jsonData, config)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("_token", response.data.token);
          localStorage.setItem("entidade_id", response.data.user.entidade_id);
          localStorage.setItem("user_name", response.data.user.nome);
          props.history.push("/");
        }
      })
      .catch(() => {
        setMessageUser("E-mail e/ou senha incorretos!");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <Container>
      <LoginBox
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          id="logo-login"
          src={require("../../assets/logo-dark.png")}
          alt="logo siscol"
        />

        {messageUser && messageUser !== "" && (
          <div
            class="alert alert-danger"
            style={{ width: "100%" }}
            role="alert"
          >
            {messageUser}
          </div>
        )}
        <Form onSubmit={handleSubmitLogin}>
          <div className="mb-4 input-group">
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
          <div className="input-group mb-4">
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
            disabled={loading}
          >
            {!loading ? "Entrar" : <PulseLoader color={"#fff"} />}
          </button>
        </Form>
        <FooterBox className="secondary" style={{ marginTop: 40 }}>
          <span>
            Não possui uma conta?
            <br />
            Registre-se gratuitamente.
          </span>
        </FooterBox>
      </LoginBox>
    </Container>
  );
}
