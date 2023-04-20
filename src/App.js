import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import PaginaInicial from './pages/PaginaInicial';
import Cart from './pages/Cart';
import Details from './pages/Details';
import Checkout from './pages/Checkout';
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
        <Switch>
          <Route exact path="/" component={ PaginaInicial } />
          <Route exact path="/cart" component={ Cart } />
          <Route exact path="/checkout" component={ Checkout } />
          <Route exact path="/product/:id" component={ Details } />
        </Switch>
      </div>
    );
  }
}

export default App;
