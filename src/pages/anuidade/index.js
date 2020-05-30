import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container } from "./styles";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";

import { dateFormat } from "../../Utils";
import api from "../../services/api";
import ModalExcluir from "../../components/Modal/Excluir";

function Anuidade(props) {
  const [guias, setGuias] = useState([]);
  const [toLogin, setToLogin] = useState(false);
  const [page, setPage] = useState(1);
  const [idGuia, setIdGuia] = useState(null);
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

  return (
    <Container className="container-fluid">
      <h2>Anuidades</h2>
      <Link className="btn primary" to="/nova-guia">
        <FaPlusSquare /> Nova anuidade
      </Link>
      <div className="card animate table-rounded">
        <div className="card-head"></div>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalExcluir
        message={"Isso apagará o registro permanentemente."}
        deleteFunction={deleteGuia}
      />
    </Container>
  );
}

export default Anuidade;
