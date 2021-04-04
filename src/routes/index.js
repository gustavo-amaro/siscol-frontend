import React from "react";

import { Switch, Route } from "react-router-dom";

import Main from "../pages/main";
import Pescador from "../pages/pescador";
import Erro404 from "../pages/erro/erro404";
import NovoPescador from "../pages/pescador/NovoPescador";
import Address from "../pages/pescador/NovoPescador/Address";
import FisherInfo from "../pages/pescador/FisherInfo";
import Login from "../pages/login";
import Register from "../pages/Register";
import RegisterResponsavel from "../pages/Register/Responsavel";
import RegisterEntidade from "../pages/Register/Entidade";
import PrivateRoute from "./PrivateRoute";
import Anuidade from "../pages/anuidade";
import ShowGuia from "../pages/anuidade/ShowGuia";
import Caixa from "../pages/Caixa";

const Routes = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Main} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/register/responsavel" component={RegisterResponsavel} />
    <Route exact path="/register/entidade" component={RegisterEntidade} />
    <Route exact path="/login" component={Login} />
    <PrivateRoute exact path="/pescador" component={Pescador} />
    <PrivateRoute path="/pescador/:page" component={Pescador} />
    <PrivateRoute exact path="/editar-pescador/:id" component={NovoPescador} />
    <PrivateRoute exact path="/novo-pescador" component={NovoPescador} />
    <PrivateRoute
      exact
      path="/novo-pescador/endereco/:id"
      component={Address}
    />
    <PrivateRoute exact path="/ver-pescador/:id" component={FisherInfo} />
    <PrivateRoute exact path="/anuidade" component={Anuidade} />
    <PrivateRoute exact path="/ver-guia/:id" component={ShowGuia} />
    <PrivateRoute exact path="/caixa" component={Caixa} />
    <PrivateRoute path="*" component={Erro404} />
  </Switch>
);

export default Routes;
