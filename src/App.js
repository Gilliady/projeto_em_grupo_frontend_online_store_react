import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import PaginaInicial from './components/PaginaInicial';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ PaginaInicial } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
