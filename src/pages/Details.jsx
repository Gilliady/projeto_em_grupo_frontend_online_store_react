import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
import { getProductById } from '../services/api';

export default class Details extends Component {
  state = {
    product: {},
  };

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const product = await getProductById(id);
    this.setState({ product });
  };

  render() {
    const { product } = this.state;
    const { history } = this.props;
    return (
      <>
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ () => history.push('/cart') }
        >
          Carrinho
        </button>
        {
          product.attributes
          && <ProductCard product={ product } isOnPreview />
        }
      </>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
