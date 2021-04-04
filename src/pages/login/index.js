import React from "react";

import {
  Container,
  LoginBox,
  Form,
  FooterBox,
  TextLogin,
  Square,
} from "./styles";

import api from "../../services/api";
import { FaArrowRight } from "react-icons/fa";

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
      <TextLogin>
        O SISCOL é um sistema completo para gestão da sua colônia de pescadores.
        Tenha total controle sobre seus afiliados de forma simples e segura!
      </TextLogin>
      <LoginBox>
        <Form onSubmit={handleSubmitLogin}>
          <div className="input-field" style={{ width: "75%", marginTop: 50 }}>
            <input
              id="first_name"
              name="email"
              type="text"
              autoComplete="off"
            />
            <label htmlFor="first_name">Email</label>
          </div>
          <div className="input-field" style={{ width: "75%" }}>
            <input id="last_name" name="password" type="password" />
            <label htmlFor="last_name">Senha</label>
          </div>
          <div className="button-submit">
            <button
              type="submit"
              className="btn secondary border-radius"
              title="Fazer login"
            >
              <FaArrowRight />
            </button>
          </div>
        </Form>
        <FooterBox className="secondary">
          <span>
            Não possui uma conta?
            <br />
            Registre-se gratuitamente.
          </span>
        </FooterBox>
      </LoginBox>

      <Square top={170} left={350} delay={100} />
      <Square top={330} left={50} delay={150} />
      <Square bottom={100} left={400} delay={50} />
      <Square top={80} right={150} delay={250} />
      <Square top={100} right={400} delay={250} />
      <Square bottom={50} right={200} delay={200} />
      <Square bottom={20} right={600} delay={300} />
    </Container>
  );
}
