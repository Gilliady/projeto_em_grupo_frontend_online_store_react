import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import PaginaInicial from './pages/PaginaInicial';
import Cart from './pages/Cart';
import Details from './pages/Details';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ PaginaInicial } />
            <Route exact path="/cart" component={ Cart } />
            <Route exact path="/product/:id" component={ Details } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
