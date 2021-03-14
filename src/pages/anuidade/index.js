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
  FaAngleLeft,
  FaAngleRight,
  FaForward,
  FaBackward,
} from "react-icons/fa";
import { HashLoader } from "react-spinners";
import queryString from "query-string";
import Pagination from "react-js-pagination";

import { dateFormat } from "../../Utils";
import api from "../../services/api";
import ModalExcluir from "../../components/Modal/Excluir";
import ModalNewGuia from "../../components/Modal/NewGuia";
import { PaginationInfo } from "../pescador/styles";

function Anuidade(props) {
  const [guias, setGuias] = useState([]);
  const [toLogin, setToLogin] = useState(false);
  const [page, setPage] = useState(1);
  const [idGuia, setIdGuia] = useState(null);
  const [nomePescador, setNomePescador] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [pagination, setPagination] = useState({
    itemCount: 0,
    pageCount: 0,
    pages: 0,
    currentPage: 1,
  });

  async function getAnuidades() {
    try {
      const response = await api.get(`/guias/page/${page}`);
      setGuias(response.data);
    } catch (e) {
      setToLogin(true);
    }
  }
  useEffect(() => {
    async function getAnuidades() {
      try {
        const response = await api.get(`/guias?page=${page}`);
        setGuias(response.data.guias);
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
    }
    if (!search) getAnuidades();
  }, [page, search]);

  useEffect(() => {
    const values = queryString.parse(props.location.search);
    let p = values.page;
    const search = values.search;
    if (p) {
      setPage(p);
    }
    setSearch(search);
  }, [props.location.search]);

  useEffect(() => {
    async function getGuiasByName() {
      setLoading(true);
      const data = (await api.get(`/guias/nome/${search}?page=${page}`)).data;
      setGuias(data.guias);
      setPagination({
        itemCount: data.itemCount,
        pageCount: data.pageCount,
        pages: data.pages,
        currentPage: data.currentPage,
      });
      setLoading(false);
    }
    if (search) getGuiasByName();
  }, [page, search]);

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
    setPage(1);
    if (nomePescador === "") return props.history.push(`/anuidade`);
    return props.history.push(`/anuidade?search=${nomePescador}`);
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
        <div
          className="card-head secondary table-rounded"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
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
          <PaginationInfo>
            <span style={{ marginRight: 20 }}>
              Página: {pagination.currentPage}/{pagination.pageCount}
            </span>
            <span>{pagination.itemCount} Resultados</span>
          </PaginationInfo>
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
        <Pagination
          activePage={parseInt(pagination.currentPage)}
          pageCount={parseInt(pagination.pageCount)}
          totalItemsCount={parseInt(pagination.itemCount)}
          onChange={(page) => {
            if (search)
              return props.history.push(
                `/anuidade?page=${page}&search=${search}`
              );

            props.history.push(`/anuidade?page=${page}`);
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
        message={"Isso apagará o registro permanentemente."}
        deleteFunction={deleteGuia}
      />
      <ModalNewGuia />
    </Container>
  );
}

export default Anuidade;
