import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class PaginaInicial extends Component {
  state = {
    termoBusca: '',
  };

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { termoBusca } = this.state;
    const { history } = this.props;
    return (
      <div>
        <label htmlFor="">
          <input
            type="text"
            name="termoBusca"
            value={ termoBusca }
            placeholder="Digite o produto..."
            onChange={ this.handleChange }
          />
        </label>
        {
          termoBusca === '' ? (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>)
            : <ul />
        }
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ () => history.push('/cart') }
        >
          Carrinho
        </button>
      </div>
    );
  }
}

PaginaInicial.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
