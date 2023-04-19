import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';

export default class PaginaInicial extends Component {
  state = {
    termoBusca: '',
    queryCategory: '',
    categoriesList: [],
    productList: [],
    searched: false,
  };

  componentDidMount() {
    this.getCategoriesBtn();
  }

  getCategoriesBtn = async () => {
    const categoriesList = await getCategories();
    this.setState({ categoriesList });
  };

  fetchQueryItens = async () => {
    const { termoBusca, queryCategory } = this.state;
    const products = await getProductsFromCategoryAndQuery(queryCategory, termoBusca);
    this.setState({ productList: products.results, searched: true });
  };

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { termoBusca, categoriesList, productList, searched } = this.state;
    const { history } = this.props;

    const listaCategorias = categoriesList.map(({ id, name }) => (
      <li key={ id }>
        <label data-testid="category">
          <input
            type="radio"
            name="queryCategory"
            value=""
            onChange={ this.handleChange }
          />
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
            data-testid="query-input"
            value={ termoBusca }
            placeholder="Digite o produto..."
            onChange={ this.handleChange }
          />
        </label>
        <button onClick={ this.fetchQueryItens } data-testid="query-button">
          Pesquisar
        </button>
        {!searched ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        ) : (
          <ul>
            {productList.length > 0
              ? productList.map((product) => (
                <li key={ product.id } data-testid="product">
                  <h3>{product.title}</h3>
                  <img src={ product.thumbnail } alt={ product.title } />
                  <button>Adicionar ao carrinho</button>
                </li>
              )) : <h2>Nenhum produto foi encontrado</h2>}
            {}
          </ul>
        )}
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ () => history.push('/cart') }
        >
          Carrinho
        </button>
        <ul>{listaCategorias}</ul>
      </div>
    );
  }
}

PaginaInicial.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
