import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
    </HashRouter>
  );
}

export default App;
