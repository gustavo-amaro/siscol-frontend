import React, { useEffect, useState } from 'react';
import {FaEdit, FaEye, FaTrash} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import M from 'materialize-css';
import './styles.scss';

export default function Pescador(props) {
    const [page, setPage] = useState(1);
    const [pescadores, setPescadores] = useState([1, 2, 3]);
    const [idPescador, setIdPescador] = useState(0);
    async function getPescadores(){
        const response = await api.get(`/pescadores/page/${page}`);
        setPescadores(response.data);
    }
    useEffect(()=>{
        let p = props.match.params.page;
       if(p){
           setPage(p);
       }
       getPescadores();
        
       var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {opacity: 0.5});

    }, []);
    function dateFormat(date){
        let data = new Date(date);
        data.setDate(data.getDate() + 1);
        return data.toLocaleDateString();
    }
    async  function deletePescador(e){
        e.preventDefault();
        const response = await api.delete(`/pescadores/${idPescador}`);
        getPescadores();
    }
  return (
    <div className="container-fluid">
        <h2>Pescador</h2>

        <Link className="btn primary" to="/novo-pescador">Novo pescador</Link>
        <div className="card animate table-rounded">
            <div className="card-head">
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
                    {pescadores.map(pescador=>(
                            <tr key={pescador.id}>
                                <td>{pescador.rgp}</td>
                                <td>{pescador.nome}</td>
                                <td>{dateFormat(pescador.nascimento)}</td>
                                <td>{pescador.rg}</td>
                                <td>
                                    <Link className="btn blue" to='/pescador/'><FaEye /></Link>
                                    <a className="btn green"><FaEdit /></a>
                                    <a className="btn red modal-trigger" href="#modalExcluir" onClick={() => setIdPescador(pescador.id)}><FaTrash /></a>
                                </td>
                            </tr>
                    ))}
                </tbody>
            </table>
            <div className="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
            </div>
        </div>
        {/*Modal de exclusão*/}
        <div id="modalExcluir" className="modal bottom-sheet">
            <div className="modal-content">
                <h4>Tem certeza que deseja excluir?</h4>
                <p>
                    <strong>Atenção:</strong> Serão apagados todos os registros relacionados a esse pescador.
                </p>
                <p>Esta ação não pode ser desfeita.</p>
            </div>
            <div className="modal-footer">
                <a className="btn modal-close">Cancelar</a>
                <a href="#!" className="modal-close waves-effect waves-red btn red" onClick={deletePescador}>Excluir</a>
            </div>
        </div>
    </div>
  );
}
