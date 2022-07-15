import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './hooks/RecipesAppProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import './App.css';

function App() {
  return (
    <Switch>
      <Provider>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
      </Provider>
    </Switch>
  );
}

export default App;
