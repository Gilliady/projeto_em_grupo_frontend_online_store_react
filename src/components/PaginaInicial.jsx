import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getCategories } from '../services/api';

export default class PaginaInicial extends Component {
  state = {
    termoBusca: '',
    categoriesList: [],
  };

  componentDidMount() {
    this.getCategoriesBtn();
  }

  getCategoriesBtn = async () => {
    const categoriesList = await getCategories();
    this.setState({ categoriesList });
  };

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { termoBusca, categoriesList } = this.state;
    const { history } = this.props;

    const listaCategorias = categoriesList.map(({ id, name }) => (
      <li key={ id }>
        <label data-testid="category">
          <input type="radio" name="" value="" />
          {name}
        </label>
      </li>
    ));

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
        <ul>
          { listaCategorias }
        </ul>

      </div>
    );
  }
}

PaginaInicial.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
