import React, { useEffect, useState } from "react";
import { FaUser, FaDollarSign, FaBirthdayCake } from "react-icons/fa";

import { Container } from "./styles";
import api from "../../services/api";
import { dateFormat } from "../../Utils";

export default function Main() {
  const [totalFiliados, setTotalFiliados] = useState(0);
  const [totalMensal, setTotalMensal] = useState(0);
  const [aniversarios, setAniversarios] = useState([]);

  useEffect(() => {
    async function getTotalFiliados() {
      const response = await api.get("/pescadores/registros/total");
      setTotalFiliados(response.data.count);
    }
    //
    async function getTotalMensal() {
      const response = await api.get("/guias/totalMensal");
      setTotalMensal(response.data.totalMonth);
    }

    async function getProximosAniversarios() {
      const aniversarios = (await api.get("/pescadores/proximos/aniversarios"))
        .data;
      setAniversarios(aniversarios);
    }

    getTotalFiliados();
    getTotalMensal();
    getProximosAniversarios();
  }, []);

  return (
    <Container className="container-fluid">
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
          <div className="card-panel fragment border-secondary">
            <div className="icon">
              <FaDollarSign />
            </div>
            <div className="card-content">
              <h2>Total Arrecado(Mês)</h2>
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalMensal ? totalMensal : 0)}
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
                    {aniversarios.map((pescador) => (
                      <tr key={pescador.id}>
                        <td>{pescador.nome}</td>
                        <td>{dateFormat(pescador.nascimento).substr(0, 5)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
