import React, { useState, useEffect } from "react";

import api from "../../../services/api";

import { Redirect } from "react-router-dom";
import { cpfMask, nitMask, ceiMask } from "../../../Utils/Masks";
import { formatDate } from "../../../Utils";
import axios from "axios";

export default function NovoPescador(props) {
  const [toAddress, setToAddress] = useState(false);
  const [id, setId] = useState(null);
  const [cpf, setCpf] = useState("");
  const [nit, setNit] = useState("");
  const [cei, setCei] = useState("");
  const [fisher, setFisher] = useState({});
  const [nascimento, setNascimento] = useState("");
  const [primeiroRgp, setPrimeiroRgp] = useState("");
  const [emissaoRgp, setEmissaoRgp] = useState("");
  const [filiacao, setFiliacao] = useState("");
  const [toLogin, setToLogin] = useState(false);
  const [foto, setFoto] = useState(null);

  const entidade_id = localStorage.getItem("entidade_id");

  useEffect(() => {
    const fisherId = props.match.params.id;

    async function getFisher(fisherId) {
      try {
        const response = await api.get("/pescadores/" + fisherId);
        setFisher(response.data);
        setCpf(cpfMask(response.data.cpf));
        setCei(ceiMask(response.data.cei));
        setNit(nitMask(response.data.nit));
        setNascimento(formatDate(response.data.nascimento));
        setPrimeiroRgp(formatDate(response.data.data_do_primeiro_rgp));
        setFiliacao(formatDate(response.data.data_de_filiacao));
        setEmissaoRgp(formatDate(response.data.data_de_emissao_rgp));
        setFoto(response.data.foto);
      } catch (e) {
        setToLogin(true);
      }

      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        input.focus();
        input.blur();
      });
    }

    if (fisherId) {
      setId(fisherId);
      getFisher(fisherId);
    }
  }, [props.match.params.id]);

  function handleSubmitForm(e) {
    e.preventDefault();
    if (!id) addFisher(e);
    else updateFisher(e);
  }
  async function addFisher(e) {
    const data = {
      nome: e.target.nome.value.toUpperCase(),
      cpf: e.target.cpf.value.replace(/\D/g, ""),
      rg: e.target.rg.value.toUpperCase(),
      nascimento: e.target.nascimento.value,
      rgp: e.target.rgp.value.toUpperCase(),
      data_de_emissao_rgp: e.target.data_de_emissao_rgp.value,
      data_do_primeiro_rgp: e.target.data_do_primeiro_rgp.value,
      titulo: e.target.titulo.value.replace(/\D/g, ""),
      data_de_filiacao: e.target.data_de_filiacao.value,
      nit: e.target.nit.value.replace(/\D/g, ""),
      cei: e.target.cei.value.replace(/\D/g, ""),
      foto
    };
    const jsonData = JSON.stringify(data);
    try {
      const response = await api.post(`/pescadores/${entidade_id}`, jsonData);

      if (response.data.erro) {
        alert("erro " + response.data.erro);
      } else if (response.status === 200) {
        alert("Pescador cadastrado no sistema!");
        setId(response.data.id);
        setToAddress(true);
      }
    } catch (e) {
      setToLogin(true);
    }
  }
  async function updateFisher(e) {
    const data = {
      nome: e.target.nome.value.toUpperCase(),
      cpf: e.target.cpf.value.replace(/\D/g, ""),
      rg: e.target.rg.value.toUpperCase(),
      nascimento: e.target.nascimento.value,
      rgp: e.target.rgp.value.toUpperCase(),
      data_de_emissao_rgp: e.target.data_de_emissao_rgp.value,
      data_do_primeiro_rgp: e.target.data_do_primeiro_rgp.value,
      titulo: e.target.titulo.value.replace(/\D/g, ""),
      data_de_filiacao: e.target.data_de_filiacao.value,
      nit: e.target.nit.value.replace(/\D/g, ""),
      cei: e.target.cei.value.replace(/\D/g, ""),
      foto
    };
    const jsonData = JSON.stringify(data);

    try {
      let response = await api.put(`/pescadores/${id}`, jsonData);
      if (response.data.updated) {
        alert("Informações do pescador foram atualizadas!");
        setToAddress(true);
      } else {
        alert("erro " + response.data.erro);
      }
    } catch (e) {
      setToLogin(true);
    }
  }

  useEffect(() => {
    console.log(`nascimento: ${nascimento}`);
    console.log(`cpf: ${cpf}`);
    if(nascimento && cpf.length === 14){
      const numerosCpf = cpf.replace(/\D/g, "");
      const nascimentoArray = nascimento.split('-');
      axios.get(`https://sistemasweb.agricultura.gov.br/rgp/web/sargp/index.php/atividade_pesca_profissional/atividade/RegularidadePescador?cpf=${numerosCpf}&dtnascimento=${nascimentoArray[2]}%2F${nascimentoArray[1]}%2F${nascimentoArray[0]}`, 
        {
          headers: {
            "Referer": 'https://sistemasweb.agricultura.gov.br/rgp/web/sargp/index.php/atividade_pesca_profissional/atividade/create/',
            "origin": 'https://sistemasweb.agricultura.gov.br/rgp/web/sargp/index.php/atividade_pesca_profissional/atividade/create'
          }
        }
      ).then(response => {
        console.log(response)
      })
    }
  }, [nascimento, cpf]);

  if (toAddress) {
    return <Redirect to={`/novo-pescador/endereco/${id}`} />;
  }
  if (toLogin) {
    //return <Redirect to="/login" />;
  }
  return (
    <div className="container-fluid">
      <h2>Novo Pescador</h2>
      <div className="row card">
        <form className="col s12" onSubmit={handleSubmitForm}>
          <div className="row">
            <div className="input-field col s12 m6">
              <input
                id="nome"
                name="nome"
                type="text"
                defaultValue={fisher.nome}
              />
              <label htmlFor="nome">Nome</label>
            </div>
            <div className="input-field col s12 m6">
              <input
                id="nascimento"
                name="nascimento"
                type="date"
                defaultValue={nascimento}
                onChange={e => setNascimento(e.target.value)}
              />
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
              <input
                id="rg"
                type="text"
                maxLength={15}
                defaultValue={fisher.rg}
              />
              <label htmlFor="rg">RG</label>
            </div>
            <div className="input-field col s12 m4">
              <input
                id="rgp"
                type="text"
                name="rgp"
                maxLength={15}
                defaultValue={fisher.rgp}
              />
              <label htmlFor="rgp">RGP</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col m4">
              <input
                id="data_de_emissao_rgp"
                name="data_de_emissao_rgp"
                type="date"
                defaultValue={emissaoRgp}
              />
              <label htmlFor="data_de_emissao_rgp">Data de emissão RGP</label>
            </div>
            <div className="input-field col m4">
              <input
                id="data_do_primeiro_rgp"
                type="date"
                name="data_do_primeiro_rgp"
                defaultValue={primeiroRgp}
              />
              <label htmlFor="data_do_primeiro_rgp">Data do primeiro RGP</label>
            </div>
            <div className="input-field col m4 s12">
              <input
                id="data_de_filiacao"
                type="date"
                name="data_de_filiacao"
                defaultValue={filiacao}
              />
              <label htmlFor="data_de_filiacao">Data de filiação</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col m4">
              <input
                id="titulo"
                name="titulo"
                type="text"
                maxLength={15}
                defaultValue={fisher.titulo}
              />
              <label htmlFor="titulo">Titulo</label>
            </div>
            <div className="input-field col m4">
              <input
                id="nit"
                type="text"
                name="nit"
                defaultValue={fisher.nit}
                value={nit}
                onChange={(e) => setNit(nitMask(e.target.value))}
              />
              <label htmlFor="nit">NIT</label>
            </div>
            <div className="input-field col m4 s12">
              <input
                id="cei"
                type="text"
                name="cei"
                defaultValue={fisher.cei}
                value={cei}
                onChange={(e) => setCei(ceiMask(e.target.value))}
              />
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
