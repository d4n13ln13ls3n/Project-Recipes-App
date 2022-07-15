import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './hooks/RecipesAppProvider';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';

function App() {
  return (
    <Switch>
      <Provider>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" component={ Foods } />
      </Provider>
    </Switch>
  );
}

export default App;
