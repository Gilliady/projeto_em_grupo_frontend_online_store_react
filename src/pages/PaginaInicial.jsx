import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import ProductCard from '../components/ProductCard';
import GoToCart from '../components/GoToCart';

export default class PaginaInicial extends Component {
  state = {
    termoBusca: '',
    queryCategory: '',
    categoriesList: [],
    productList: [],
    searched: false,
    count: 0,
  };

  componentDidMount() {
    this.getCategoriesBtn();
    const previousStorage = JSON.parse(localStorage.getItem('cart'));
    if (!previousStorage) localStorage.setItem('cart', JSON.stringify([]));
    this.addCount();
  }

  addCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    this.setState({ count: cart
      .reduce((acc, { quantity }) => acc + Number(quantity), 0) });
  };

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
    }, () => {
      if (name === 'queryCategory') this.fetchQueryItens();
    });
  };

  render() {
    const { termoBusca,
      queryCategory,
      categoriesList,
      productList,
      searched,
      count,
    } = this.state;
    const { history } = this.props;

    const listaCategorias = categoriesList.map(({ id, name }) => (
      <li key={ id }>
        <label data-testid="category">
          <input
            type="radio"
            name="queryCategory"
            value={ id }
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
        <GoToCart history={ history } count={ count } />
        <ul>{listaCategorias}</ul>
        {!searched ? (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        ) : (
          <ul>
            {productList.length > 0 || queryCategory.length > 0
              ? productList.map((product) => (
                <ProductCard
                  key={ product.id }
                  product={ product }
                  addCount={ this.addCount }
                  history={ history }
                />
              )) : <h2>Nenhum produto foi encontrado</h2>}
            {}
          </ul>
        )}
      </div>
    );
  }
}

PaginaInicial.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
