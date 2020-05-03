



import React from 'react';

import { Container, LoginBox, Form, SideBox } from "./styles";

import api from "../../../services/api";
import { useState } from "react";
import { Redirect } from "react-router-dom";

import {cpfMask} from '../../../Utils/Masks';

function RegisterResponsavel() {
    const [toEntidade, setToEntidade] = useState(false);
    const [cpf, setCpf] = useState('');
  
    async function handleSubmitRegister(e) {
      e.preventDefault();
      const data = {
        nome: e.target.nome.value,
        cpf: cpf
        .replace(".", "")
        .replace(".", "")
        .replace("-", ""),
        telefone: e.target.telefone.value
      };
  
      const jsonData = JSON.stringify(data);
      const token = localStorage.getItem('_token');
      const config = {
        headers: { 
          "content-type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
      };
      const response = await api.post("/responsaveis/store", jsonData, config);
      if (response.status === 200) {
        localStorage.setItem('responsavel_id', response.data.id);
        setToEntidade(true);
      }
    }
  
    if (toEntidade) {
      return <Redirect to="/register/entidade" />;
    }
  
    return (
      <Container>
        <LoginBox>
          <SideBox className="teal">
            <span>Informe os dados do representante da entidade:<br/><br/></span>
          </SideBox>
          <Form onSubmit={handleSubmitRegister}>
          <div className="input-field" style={{ width: "75%" }}>
              <input id="first_name" name="nome" type="text" autoComplete="off"/>
              <label htmlFor="first_name">Nome</label>
            </div>
            <div className="input-field" style={{ width: "75%" }}>
              <input id="cpf" name="cpf" type="text" autoComplete="off" value={cpf} onChange={e=>setCpf(cpfMask(e.target.value))}/>
              <label htmlFor="cpf">CPF</label>
              <span className="helper-text" data-error="Email inválido" data-success="Ok"></span>
            </div>
            <div className="input-field" style={{ width: "75%" }}>
              <input id="telefone" name="telefone" type="text" />
              <label htmlFor="telefone">Telefone</label>
            </div>
            <button
              type="submit"
              className="btn"
              style={{ background: "#682ab5", width: '70%'}}
            >
              Próximo
            </button>
          </Form>
        </LoginBox>
      </Container>
    );
}

export default RegisterResponsavel;
