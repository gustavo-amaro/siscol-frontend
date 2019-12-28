import React, { useEffect, useState } from 'react';
import "./styles.scss";
import api from '../../services/api';

export default function Main(){
    const [totalFiliados, setTotalFiliados] = useState(0);
    useEffect(async ()=>{
        const response = await api.get('/pescadores/registros/total/');
        console.log(response.data);
        //setTotalFiliados(response.data)
    }, []);
    return(
        <div className="container-fluid">
            <div className="row">

                <div className="col m4 s12">
                    <div className="card-panel fragment border-teal">
                        <p>Quantidade de filiados</p>
                        <span>{totalFiliados}</span>
                    </div>
                </div>

                <div className="col m4 s12">
                    <div className="card-panel fragment border-purple">
                        <p>Total Arrecado(Mês)</p>
                        <span>R$1.000</span>
                    </div> 
                </div>

            </div>
        </div>
    )
}