import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Main from '../pages/main';
import Pescador from '../pages/pescador';
import Erro404 from '../pages/erro/erro404';

const Routes = () =>(
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/pescador" component={Pescador} />
            <Route path="/pescador/:page" component={Pescador} />
            <Route path='*' component={Erro404} />
        </Switch>   
);

export default Routes;