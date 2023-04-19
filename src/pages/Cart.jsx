import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    itens: [],
  };

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.setState({ itens: cart });
  }

  render() {
    const { itens } = this.state;
    return (
      <div>
        {itens.length === 0
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : (
            <ol>
              {itens.map((item, index) => (<li key={ index }>{item}</li>))}
            </ol>)}
      </div>
    );
  }
}
