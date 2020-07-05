import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, FormSearch } from "./styles";
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaSearch,
  FaPlusSquare,
  FaMoneyBill,
} from "react-icons/fa";
import { HashLoader } from "react-spinners";

import { dateFormat } from "../../Utils";
import api from "../../services/api";
import ModalExcluir from "../../components/Modal/Excluir";
import ModalNewGuia from "../../components/Modal/NewGuia";

function Anuidade(props) {
  const [guias, setGuias] = useState([]);
  const [toLogin, setToLogin] = useState(false);
  const [page, setPage] = useState(1);
  const [idGuia, setIdGuia] = useState(null);
  const [nomePescador, setNomePescador] = useState("");
  const [loading, setLoading] = useState(false);

  async function getAnuidades() {
    const entidade_id = localStorage.getItem("entidade_id");
    try {
      const response = await api.get(
        `/entidades/${entidade_id}/guias/page/${page}`
      );
      setGuias(response.data);
    } catch (e) {
      setToLogin(true);
    }
  }
  useEffect(() => {
    let p = props.match.params.page;
    setLoading(true);
    if (p) {
      setPage(p);
    }
    async function getAnuidades() {
      const entidade_id = localStorage.getItem("entidade_id");
      try {
        const response = await api.get(
          `/entidades/${entidade_id}/guias/page/${p}`
        );
        setGuias(response.data);
        setLoading(false);
      } catch (e) {
        setToLogin(true);
      }
    }
    getAnuidades();
  }, [props.match.params.page]);

  if (toLogin) {
    return <Redirect to="/login" />;
  }

  async function deleteGuia(e) {
    e.preventDefault();
    try {
      await api.delete(`/guias/${idGuia}`);
      getAnuidades();
    } catch (e) {
      setToLogin(true);
    }
  }

  async function getGuiasByNome(e) {
    e.preventDefault();
    setLoading(true);
    const guias = (await api.get(`/guias/nome/${nomePescador}`)).data;
    setGuias(guias);
    setLoading(false);
  }

  async function handlePayNextYear(pescador_id) {
    setLoading(true);
    const guia = (
      await api.post(`/guias/paynextyear`, JSON.stringify({ pescador_id }))
    ).data;
    props.history.push(`/ver-guia/${guia.id}`);
  }

  return (
    <Container className="container-fluid">
      <h2>Anuidades</h2>
      <a className="btn primary modal-trigger" href="#modalNewGuia">
        <FaPlusSquare /> Nova anuidade
      </a>
      <div className="card animate table-rounded">
        <div className="card-head teal table-rounded">
          <FormSearch onSubmit={getGuiasByNome}>
            <input
              type="text"
              id="pesquisar_id"
              placeholder="Procurar pescador"
              className="white-text"
              style={{ marginRight: 5 }}
              onChange={(e) => setNomePescador(e.target.value)}
            />
            <button type="submit" className="btn primary">
              <FaSearch />
            </button>
          </FormSearch>
        </div>
        <table className="striped">
          <thead>
            <tr>
              <th>RGP</th>
              <th>Nome</th>
              <th>Data de emissão</th>
              <th>Ano de referência</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {guias.map((guia) => (
              <tr key={guia.id}>
                <td>{guia.pescador.rgp}</td>
                <td>{guia.pescador.nome}</td>
                <td>{dateFormat(guia.data_emissao)}</td>
                <td>{guia.ano}</td>
                <td>{guia.valor}</td>
                <td>
                  <Link className="btn blue" to={"/ver-guia/" + guia.id}>
                    <FaEye />
                  </Link>
                  <Link className="btn green" to={`/editar-guia/${guia.id}`}>
                    <FaEdit />
                  </Link>
                  <a
                    className="btn red modal-trigger"
                    href="#modalExcluir"
                    onClick={() => setIdGuia(guia.id)}
                  >
                    <FaTrash />
                  </a>
                  <button
                    className="btn primary"
                    onClick={() => handlePayNextYear(guia.pescador.id)}
                    style={{ marginLeft: 5 }}
                  >
                    <FaMoneyBill /> Pagar próximo ano
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading ? <HashLoader size={30} /> : ""}
      </div>
      <ModalExcluir
        message={"Isso apagará o registro permanentemente."}
        deleteFunction={deleteGuia}
      />
      <ModalNewGuia />
    </Container>
  );
}

export default Anuidade;
