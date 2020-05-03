import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link, Redirect } from "react-router-dom";
import api from "../../services/api";
import M from "materialize-css";
import "./styles.scss";
import { dateFormat } from "../../Utils";

export default function Pescador(props) {
  const [page, setPage] = useState(1);
  const [pescadores, setPescadores] = useState([]);
  const [idPescador, setIdPescador] = useState(0);
  const [toLogin, setToLogin] = useState(false);

  const token = localStorage.getItem("_token");
  const [config] = useState({
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  async function getPescadores (){
    const entidade_id = localStorage.getItem('entidade_id')
    try {
      const response = await api.get(`/pescadores/${entidade_id}/page/${page}`, config);
      setPescadores(response.data);
    } catch (e) {
      setToLogin(true);
    }
  }

  useEffect(() => {
    let p = props.match.params.page;
    if (p) {
      setPage(p);
    }
    async function getPescadores (){
      const entidade_id = localStorage.getItem('entidade_id')
      try {
        const response = await api.get(`/pescadores/${entidade_id}/page/${p}`, config);
        setPescadores(response.data);
      } catch (e) {
        setToLogin(true);
      }
    }
    getPescadores();

    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, { opacity: 0.5 });

  }, [props.match.params.page, config]);

  async function deletePescador(e) {
    e.preventDefault();
    try {
      await api.delete(`/pescadores/${idPescador}`, config);
      getPescadores();
    } catch (e) {
      setToLogin(true);
    }
  }

  if (toLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container-fluid">
      <h2>Pescador</h2>

      <Link className="btn primary" to="/novo-pescador">
        Novo pescador
      </Link>
      <div className="card animate table-rounded">
        <div className="card-head"></div>
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
        <div className="card-action">
          <a href="nolink">This is a link</a>
          <a href="nolink">This is a link</a>
        </div>
      </div>
      {/*Modal de exclusão*/}
      <div id="modalExcluir" className="modal bottom-sheet">
        <div className="modal-content">
          <h4>Tem certeza que deseja excluir?</h4>
          <p>
            <strong>Atenção:</strong> Serão apagados todos os registros
            relacionados a esse pescador.
          </p>
          <p>Esta ação não pode ser desfeita.</p>
        </div>
        <div className="modal-footer">
          <a href="closemodal" className="btn modal-close">
            Cancelar
          </a>
          <a
            href="#!"
            className="modal-close waves-effect waves-red btn red"
            onClick={deletePescador}
          >
            Excluir
          </a>
        </div>
      </div>
    </div>
  );
}
