import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { Container, ListFisher, ListItem } from "./styles";
import { MdAccountCircle, MdToday, MdPayment } from "react-icons/md";
import { Redirect } from "react-router-dom";
import api from "../../../services/api";

function NewGuia() {
  const [pescador, setPescador] = useState({});
  const [ano, setAno] = useState(2020);
  const [valor, setValor] = useState(200);
  const [listFisherShow, setListFisherShow] = useState(false);
  const [nomePescador, setNomePescador] = useState("");

  const [pescadores, setPescadores] = useState([]);

  const [guiaId, setGuiaId] = useState(null);
  const [toShowGuia, setToShowGuia] = useState(false);

  useEffect(() => {
    const modals = document.querySelectorAll(".modal");
    M.Modal.init(modals, { opacity: 0.5 });
  }, []);

  useEffect(() => {
    async function getPescadores() {
      const entidade_id = localStorage.getItem("entidade_id");
      const response = await api.get(`/pescadores/${entidade_id}/page/${1}`);
      setPescadores(response.data);
    }
    getPescadores();
  }, []);

  async function handleClickGerarGuia() {
    //
    if (pescador.id) {
      const data = {
        valor,
        data_emissao: Date.now(),
        ano,
      };
      const jsonData = JSON.stringify(data);
      const response = await api.post(
        `/pescadores/${pescador.id}/guias`,
        jsonData
      );
      const { id } = response.data;
      setGuiaId(id);
      setToShowGuia(true);
    }
  }

  function handleClickItem(pescador) {
    setPescador(pescador);
    document.getElementById("pescador_id").focus();
    setListFisherShow(false);
  }

  function resetInputs() {
    setPescador({});
  }

  if (toShowGuia && guiaId) {
    return <Redirect to={`/ver-guia/${guiaId}`} />;
  }
  return (
    <Container id="modalNewGuia" className="modal">
      <h2>Nova Anuidade</h2>

      <div className="modal-content">
        <div className="row">
          <div className="input-field col s12">
            <MdAccountCircle className="prefix" />
            <input
              name="pescador"
              id="pescador_id"
              type="text"
              autoComplete="off"
              onFocus={() => setListFisherShow(true)}
              value={pescador.nome ? pescador.nome : nomePescador}
              onChange={(e) => setNomePescador(e.target.value)}
            />
            <label htmlFor="pescador_id">Pescador</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m6">
            <MdToday className="prefix" />
            <input
              name="ano"
              type="number"
              placeholder="ano"
              id="ano"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
            />
          </div>
          <div className="input-field col s12 m6">
            <MdPayment className="prefix" />
            <input
              name="valor"
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="valor"
            />
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <a
          href="#!"
          className="modal-close waves-effect btn-flat"
          onClick={resetInputs}
        >
          Cancelar
        </a>
        <button
          className="waves-effect btn primary"
          onClick={handleClickGerarGuia}
        >
          Gerar guia
        </button>
      </div>

      <ListFisher show={listFisherShow}>
        {pescadores.map((pescador) => (
          <ListItem key={pescador.id} onClick={() => handleClickItem(pescador)}>
            {pescador.nome}
          </ListItem>
        ))}
      </ListFisher>
    </Container>
  );
}

export default NewGuia;
