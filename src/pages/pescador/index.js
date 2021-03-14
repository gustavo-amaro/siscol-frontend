import React, { useCallback, useEffect, useState } from "react";
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaPlusSquare,
  FaSearch,
  FaAngleRight,
  FaAngleLeft,
  FaForward,
  FaBackward,
} from "react-icons/fa";
import { Link, Redirect } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Pagination from "react-js-pagination";
import queryString from "query-string";

import api from "../../services/api";
import { dateFormat } from "../../Utils";
import ModalExcluir from "../../components/Modal/Excluir";
import { Container, FormSearch } from "./styles";

export default function Pescador(props) {
  const [page, setPage] = useState(1);
  const [pescadores, setPescadores] = useState([]);
  const [idPescador, setIdPescador] = useState(0);
  const [toLogin, setToLogin] = useState(false);
  const [pagination, setPagination] = useState({
    itemCount: 0,
    pageCount: 0,
    pages: 0,
    currentPage: 1,
  });

  const getPescadores = useCallback(async (page) => {
    try {
      setLoading(true);
      const response = await api.get(`/pescadores?page=${page}`);
      setPescadores(response.data.pescadores);
      setPagination({
        itemCount: response.data.itemCount,
        pageCount: response.data.pageCount,
        pages: response.data.pages,
        currentPage: response.data.currentPage,
      });
      setLoading(false);
    } catch (e) {
      setToLogin(true);
    }
  }, []);

  useEffect(() => {
    const values = queryString.parse(props.location.search);
    let p = values.page;
    if (p) {
      setPage(p);
    }
  }, [props.location.search]);

  useEffect(() => {
    getPescadores(page);
  }, [page, getPescadores]);

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
                    className="btn blue"
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
        <Pagination
          activePage={parseInt(pagination.currentPage)}
          pageCount={parseInt(pagination.pageCount)}
          totalItemsCount={parseInt(pagination.itemCount)}
          onChange={(page) => {
            props.history.push(`/pescador?page=${page}`);
          }}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          activeClass="active"
          nextPageText={<FaAngleRight />}
          prevPageText={<FaAngleLeft />}
          lastPageText={<FaForward />}
          firstPageText={<FaBackward />}
        />
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
