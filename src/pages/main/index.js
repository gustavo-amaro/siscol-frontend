import React, { useEffect, useState } from "react";
import { FaUser, FaDollarSign, FaBirthdayCake } from "react-icons/fa";

import "./styles.scss";
import api from "../../services/api";
import { Redirect } from "react-router-dom";

export default function Main() {
  const [totalFiliados, setTotalFiliados] = useState(0);
  const [totalMensal, setTotalMensal] = useState(0);
  const [toLogin, setToLogin] = useState(false);

  const token = localStorage.getItem("_token");
  
  const [config] = useState({
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    document.title = "Principal";
    async function getTotalFiliados() {
      const entidade_id = localStorage.getItem('entidade_id');
      try {
        const response = await api.get(`/pescadores/${entidade_id}/registros/total/`, config);
        setTotalFiliados(response.data.count);
      } catch (e) {
        setToLogin(true);
      }
    }
    async function getTotalMensal() {
      const entidade_id = localStorage.getItem('entidade_id');
      try {
        const response = await api.get(`/guias/${entidade_id}/totalMensal`, config);
        setTotalMensal(response.data.totalMonth);
      } catch (e) {
        setToLogin(true);
      }
    }

    getTotalFiliados();
    getTotalMensal();
  }, [config]);
  if (toLogin) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col l4 m6 s12">
          <div className="card-panel fragment border-blue">
            <div className="icon">
              <FaUser />
            </div>
            <div className="card-content">
              <h2>Quantidade de filiados</h2>
              <span>{totalFiliados}</span>
            </div>
          </div>
        </div>

        <div className="col l4 m6 s12">
          <div className="card-panel fragment border-teal">
            <div className="icon">
              <FaDollarSign />
            </div>
            <div className="card-content">
              <h2>Total Arrecado(Mês)</h2>
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalMensal)}
              </span>
            </div>
          </div>
        </div>

        <div className="col l4 m6 s12">
          <div className="card-panel fragment border-primary">
            <div className="icon">
              <FaBirthdayCake />
            </div>
            <div className="card-content">
              <h2>Próximos aniversários:</h2>
              <span>
                <table>
                  <tbody>
                    <tr key={1}>
                      <td>José Pereira</td>
                      <td>20/04/2020</td>
                    </tr>
                    <tr key={2}>
                      <td>Vicente da Silva</td>
                      <td>25/04/2020</td>
                    </tr>
                  </tbody>
                </table>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
