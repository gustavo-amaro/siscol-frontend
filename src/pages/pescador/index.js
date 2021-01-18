import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash, FaPlusSquare, FaSearch } from "react-icons/fa";
import { Link, Redirect } from "react-router-dom";
import { HashLoader } from "react-spinners";
import api from "../../services/api";
import { dateFormat } from "../../Utils";
import ModalExcluir from "../../components/Modal/Excluir";
import { Container, FormSearch } from "./styles";

export default function Pescador(props) {
  const [page, setPage] = useState(1);
  const [pescadores, setPescadores] = useState([]);
  const [idPescador, setIdPescador] = useState(0);
  const [toLogin, setToLogin] = useState(false);

  async function getPescadores() {
    setLoading(true);
    const entidade_id = localStorage.getItem("entidade_id");
    try {
      const response = await api.get(`/pescadores/${entidade_id}/page/${page}`);
      setPescadores(response.data);
      setLoading(false);
    } catch (e) {
      setToLogin(true);
    }
  }

  useEffect(() => {
    setLoading(true);
    let p = props.match.params.page;
    if (p) {
      setPage(p);
    }
    async function getPescadores() {
      const entidade_id = localStorage.getItem("entidade_id");
      try {
        const response = await api.get(`/pescadores/${entidade_id}/page/${p}`);
        setPescadores(response.data);
        setLoading(false);
      } catch (e) {
        setToLogin(true);
      }
    }
    getPescadores();
  }, [props.match.params.page]);

  async function deletePescador(e) {
    e.preventDefault();
    try {
      await api.delete(`/pescadores/${idPescador}`);
      getPescadores();
    } catch (e) {
      setToLogin(true);
    }
  }
  const [nomePescador, setNomePescador] = useState("");
  const [loading, setLoading] = useState(false);

  async function getPescadoresByNome(e) {
    e.preventDefault();
    setLoading(true);
    const pescadores = (await api.get(`/pescadores/nome/${nomePescador}`)).data;
    setPescadores(pescadores);
    setLoading(false);
  }

  if (toLogin) {
    return <Redirect to="/login" />;
  }
  return (
    <Container className="container-fluid">
      <h2>Pescador</h2>

      <Link className="btn primary" to="/novo-pescador">
        <FaPlusSquare /> Novo pescador
      </Link>
      <div className="card animate table-rounded">
        <div className="card-head secondary table-rounded">
          <FormSearch onSubmit={getPescadoresByNome}>
            <input
              type="text"
              id="pesquisar_id"
              placeholder="Procurar pescador"
              className="white-text"
              style={{ marginRight: 5 }}
              onChange={(e) => setNomePescador(e.target.value)}
            />
            <button type="submit" className="btn primary col s4">
              <FaSearch />
            </button>
          </FormSearch>
        </div>
        <table className="striped">
          <thead>
            <tr>
              <th>RGP</th>
              <th>Nome</th>
              <th>Nascimento</th>
              <th>RG</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {pescadores.map((pescador) => (
              <tr key={pescador.id}>
                <td>{pescador.rgp}</td>
                <td>{pescador.nome}</td>
                <td>{dateFormat(pescador.nascimento)}</td>
                <td>{pescador.rg}</td>
                <td>
                  <Link
                    className="btn primary"
                    to={"/ver-pescador/" + pescador.id}
                  >
                    <FaEye />
                  </Link>
                  <Link
                    className="btn green"
                    to={`/editar-pescador/${pescador.id}`}
                  >
                    <FaEdit />
                  </Link>
                  <a
                    className="btn red modal-trigger"
                    href="#modalExcluir"
                    onClick={() => setIdPescador(pescador.id)}
                  >
                    <FaTrash />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading ? <HashLoader size={30} /> : ""}
      </div>
      <ModalExcluir
        message={
          <>
            <strong>Atenção: </strong>Serão apagados todos os registros
            relacionados a esse pescador.
          </>
        }
        deleteFunction={deletePescador}
      />
    </Container>
  );
}
