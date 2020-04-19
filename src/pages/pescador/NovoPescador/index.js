import React, { useState } from "react";

import api from "../../../services/api";

import { Redirect } from "react-router-dom";

export default function NovoPescador() {
  const [toAddress, setToAddress] = useState(false);
  const [id, setId] = useState(null);
  const [cpf, setCpf] = useState("");
  function cpfMask(value) {
    return value
      .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }
  async function addFisher(e) {
    e.preventDefault();
    const data = {
      nome: e.target.nome.value.toUpperCase(),
      cpf: e.target.cpf.value,
      rg: e.target.rg.value.toUpperCase(),
      nascimento: e.target.nascimento.value,
      rgp: e.target.rgp.value.toUpperCase(),
      data_de_emissao_rgp: e.target.data_de_emissao_rgp.value,
      data_do_primeiro_rgp: e.target.data_do_primeiro_rgp.value,
      titulo: e.target.titulo.value,
      data_de_filiacao: e.target.data_de_filiacao.value,
      nit: e.target.nit.value,
      cei: e.target.cei.value,
    };
    const jsonData = JSON.stringify(data);
    const config = {
      headers: { "content-type": "application/json" },
    };
    let response;

    response = await api.post("/pescadores", jsonData, config);

    if (response.data.erro) {
      alert("erro " + response.data.erro);
    } else if (response.status === 200) {
      alert("Pescador cadastrado no sistema!");
      setId(response.data.id);
      setToAddress(true);
    }
  }
  if (toAddress) {
    return <Redirect to={`/novo-pescador/endereco/${id}`} />;
  }
  return (
    <div className="container-fluid">
      <h2>Novo Pescador</h2>
      <div className="row card">
        <form className="col s12" onSubmit={addFisher}>
          <div className="row">
            <div className="input-field col s12 m6">
              <input id="nome" name="nome" type="text" />
              <label htmlFor="nome">Nome</label>
            </div>
            <div className="input-field col s12 m6">
              <input id="nascimento" name="nascimento" type="date" />
              <label htmlFor="nascimento">Data de nascimento</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m4">
              <input
                id="cpf"
                type="text"
                name="cpf"
                value={cpf}
                onChange={(e) => setCpf(cpfMask(e.target.value))}
              />
              <label htmlFor="cpf">CPF</label>
            </div>
            <div className="input-field col s12 m4">
              <input id="rg" type="text" />
              <label htmlFor="rg">RG</label>
            </div>
            <div className="input-field col s12 m4">
              <input id="rgp" type="text" name="rgp" />
              <label htmlFor="rgp">RGP</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col m4">
              <input
                id="data_de_emissao_rgp"
                name="data_de_emissao_rgp"
                type="date"
              />
              <label htmlFor="data_de_emissao_rgp">Data de emissão RGP</label>
            </div>
            <div className="input-field col m4">
              <input
                id="data_do_primeiro_rgp"
                type="date"
                name="data_do_primeiro_rgp"
              />
              <label htmlFor="data_do_primeiro_rgp">Data do primeiro RGP</label>
            </div>
            <div className="input-field col m4 s12">
              <input
                id="data_de_filiacao"
                type="date"
                name="data_de_filiacao"
              />
              <label htmlFor="data_de_filiacao">Data de filiação</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col m4">
              <input id="titulo" name="titulo" type="text" />
              <label htmlFor="titulo">Titulo</label>
            </div>
            <div className="input-field col m4">
              <input id="nit" type="text" name="nit" />
              <label htmlFor="nit">NIT</label>
            </div>
            <div className="input-field col m4 s12">
              <input id="cei" type="text" name="cei" />
              <label htmlFor="cei">CEI</label>
            </div>
          </div>

          <div className="row">
            <div className="col m4"></div>
            <div className="col m4 s12">
              <button
                type="submit"
                className="btn primary waves-effect"
                style={{ width: "100%" }}
              >
                Próximo
              </button>
            </div>
            <div className="col m4"></div>
          </div>
        </form>
      </div>
    </div>
  );
}
