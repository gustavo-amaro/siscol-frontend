import React from 'react';

// import { Container } from './styles';

export default function NovoPescador() {
  return (
    <div className="container-fluid">
        <h2>Novo Pescador</h2>
        <div className="row card">
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input id="nome" name="nome" type="text" />
                        <label htmlFor="nome">Nome</label>
                    </div>
                    <div className="input-field col s12 m6">
                        <input id="nascimento" name="nascimento" type="date" />
                        <label htmlFor="nascimento">Data de nascimento</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m4">
                        <input id="cpf" type="text" name="cpf" />
                        <label htmlFor="cpf">CPF</label>
                    </div>
                    <div className="input-field col s12 m4">
                        <input id="rg" type="text" />
                        <label htmlFor="rg">RG</label>
                    </div>
                    <div className="input-field col s12 m4">
                        <input id="rgp" type="text" name="rgp" />
                        <label htmlFor="rgp">RGP</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col m4">
                        <input id="data_de_emissao_rgp" name="data_de_emissao_rgp" type="date" />
                        <label htmlFor="data_de_emissao_rgp">Data de emissão RGP</label>
                    </div>
                    <div className="input-field col m4">
                        <input id="data_do_primeiro_rgp" type="date" name="data_do_primeiro_rgp" />
                        <label htmlFor="data_do_primeiro_rgp">Data do primeiro RGP</label>
                    </div>
                    <div className="input-field col m4 s12">
                        <input id="data_de_filiacao" type="date" name="data_de_filiacao" />
                        <label htmlFor="data_de_filiacao">Data de filiação</label> 
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col m4">
                        <input id="titulo" name="titulo" type="text" />
                        <label htmlFor="titulo">Titulo</label>
                    </div>
                    <div className="input-field col m4">
                        <input id="nit" type="text" name="nit" />
                        <label htmlFor="nit">NIT</label>
                    </div>
                    <div className="input-field col m4 s12">
                        <input id="cei" type="text" name="cei" />
                        <label htmlFor="cei">CEI</label> 
                    </div>
                </div>
                <div className="row">
                    <div className="col m4"></div>
                    <div className="col m4 s12">
                        <button type="submit" className="btn blue" style={{width: '100%'}}>Adicionar Pescador</button>
                    </div>
                    <div className="col m4"></div>
                </div>
            </form>
        </div>

    </div>
  );
}
