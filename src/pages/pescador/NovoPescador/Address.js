import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { Redirect } from "react-router-dom";

export default function Adress(props) {
  const [fisherAddresses, setFisherAddresses] = useState([]);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [toLogin, setToLogin] = useState(false);

  async function getFisherAddresses() {
    const id = props.match.params.id;

    try {
      const response = await api.get(`/pescadores/${id}/enderecos`);

      if (response.status === 200) {
        setFisherAddresses(response.data);
      }
    } catch (e) {
      setToLogin(true);
    }

    setShowNewAddress(false);
  }

  useEffect(() => {
    async function getFisherAddresses() {
      const id = props.match.params.id;
      const response = await api.get(`/pescadores/${id}/enderecos`);

      if (response.status === 200) {
        setFisherAddresses(response.data);
      }
      setShowNewAddress(false);
    }
    getFisherAddresses();
  }, [props.match.params.id]);

  useEffect(() => {
    if (fisherAddresses.length > 0) {
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        input.focus();
        input.blur();
      });
    }
  }, [fisherAddresses]);

  function cleanInputs() {
    document.getElementById("logradouro").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("cep").value = "";
  }

  async function updateAddress(e, id) {
    e.preventDefault();
    const data = {
      logradouro: e.target.logradouro.value,
      numero: e.target.numero.value,
      bairro: e.target.bairro.value,
      cidade: e.target.cidade.value,
      estado: e.target.estado.value,
      cep: e.target.cep.value,
    };
    const jsonData = JSON.stringify(data);

    const response = await api.put(`/enderecos/${id}`, jsonData);
    if (response.data.erro) {
      alert("erro " + response.data.erro);
    } else if (response.status === 200) {
      alert("Endereço atualizado!");
      getFisherAddresses();
    }
  }
  async function saveAddress(e) {
    e.preventDefault();
    const fisherId = props.match.params.id;
    const data = {
      logradouro: e.target.logradouro.value,
      numero: e.target.numero.value,
      bairro: e.target.bairro.value,
      cidade: e.target.cidade.value,
      estado: e.target.estado.value,
      cep: e.target.cep.value,
    };
    const jsonData = JSON.stringify(data);
    try {
      const response = await api.post(
        `/pescadores/${fisherId}/enderecos`,
        jsonData
      );
      if (response.data.erro) {
        alert("erro " + response.data.erro);
      } else if (response.status === 200) {
        alert("Endereço adicionado ao pescador!");
        console.log(response.data);
        getFisherAddresses();
      }
    } catch (e) {
      setToLogin(true);
    }
  }
  async function deleteAddress(id) {
    const response = await api.delete(`/enderecos/${id}`);
    if (response.data.erro) {
      alert("erro " + response.data.erro);
    } else if (response.status === 200) {
      alert("Endereço deletado!");
      getFisherAddresses();
    }
  }

  function handleClickAddAddress() {
    setShowNewAddress(true);
    cleanInputs();
  }

  if (toLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container-fluid">
      <h2>Endereço(s) do pescador</h2>
      {fisherAddresses.map((address) => {
        return (
          <div className="row card" key={address.id}>
            <form
              className="col s12"
              onSubmit={(e) => updateAddress(e, address.id)}
              style={{ marginTop: 40 }}
            >
              <div className="row">
                <div className="input-field col m4">
                  <input
                    id={"logradouro" + address.id}
                    name="logradouro"
                    type="text"
                    defaultValue={address.logradouro}
                  />
                  <label htmlFor={"logradouro" + address.id}>Logradouro</label>
                </div>
                <div className="input-field col m4">
                  <input
                    id={"numero" + address.id}
                    type="text"
                    name="numero"
                    defaultValue={address.numero}
                  />
                  <label htmlFor={"numero" + address.id}>Numero</label>
                </div>
                <div className="input-field col m4 s12">
                  <input
                    id={"bairro" + address.id}
                    type="text"
                    name="bairro"
                    defaultValue={address.bairro}
                  />
                  <label htmlFor={"bairro" + address.id}>Bairro</label>
                </div>
                <div className="input-field col m4">
                  <input
                    id={"cidade" + address.id}
                    name="cidade"
                    type="text"
                    defaultValue={address.cidade}
                  />
                  <label htmlFor={"cidade" + address.id}>Cidade</label>
                </div>
                <div className="input-field col m4">
                  <input
                    id={"estado" + address.id}
                    type="text"
                    name="estado"
                    defaultValue={address.estado}
                  />
                  <label htmlFor={"estado" + address.id}>Estado</label>
                </div>
                <div className="input-field col m4 s12">
                  <input
                    id={"cep" + address.id}
                    type="text"
                    name="cep"
                    defaultValue={address.cep}
                  />
                  <label htmlFor={"cep" + address.id}>CEP</label>
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
                    Atualizar Endereço
                  </button>
                  <button
                    type="button"
                    className="btn red waves-effect"
                    style={{ width: "100%", marginTop: 5 }}
                    onClick={() => deleteAddress(address.id)}
                  >
                    Excluir endereço
                  </button>
                </div>
                <div className="col m4"></div>
              </div>
            </form>
          </div>
        );
      })}
      <div
        className="row card"
        style={{ display: showNewAddress ? "block" : "none" }}
      >
        <form className="col s12" onSubmit={saveAddress}>
          <div className="row">
            <div className="input-field col m4">
              <input id="logradouro" name="logradouro" type="text" />
              <label htmlFor="logradouro">Logradouro</label>
            </div>
            <div className="input-field col m4">
              <input id="numero" type="text" name="numero" />
              <label htmlFor="numero">Numero</label>
            </div>
            <div className="input-field col m4 s12">
              <input id="bairro" type="text" name="bairro" />
              <label htmlFor="bairro">Bairro</label>
            </div>
            <div className="input-field col m4">
              <input id="cidade" name="cidade" type="text" />
              <label htmlFor="cidade">Cidade</label>
            </div>
            <div className="input-field col m4">
              <input id="estado" type="text" name="estado" />
              <label htmlFor="estado">Estado</label>
            </div>
            <div className="input-field col m4 s12">
              <input id="cep" type="text" name="cep" />
              <label htmlFor="cep">CEP</label>
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
                Salvar Endereço
              </button>
            </div>
            <div className="col m4"></div>
          </div>
        </form>
      </div>
      <button
        className="btn primary"
        onClick={handleClickAddAddress}
        style={{ display: showNewAddress ? "none" : "block" }}
      >
        Adicionar endereço
      </button>
    </div>
  );
}
