import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Main from '../pages/main';
import Pescador from '../pages/pescador';
import Erro404 from '../pages/erro/erro404';
import NovoPescador from '../pages/pescador/NovoPescador';

const Routes = () =>(
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/pescador" component={Pescador} />
            <Route path="/pescador/:page" component={Pescador} />
            <Route exact path="/novo-pescador" component={NovoPescador} />
            <Route path='*' component={Erro404} />
        </Switch>   
);

export default Routes;