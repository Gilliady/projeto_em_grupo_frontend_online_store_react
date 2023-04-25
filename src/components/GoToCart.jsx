import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class GoToCart extends Component {
  render() {
    const { history, count } = this.props;
    return (
      <button
        data-testid="shopping-cart-button"
        type="button"
        onClick={ () => history.push('/cart') }
      >
        carrinho
        {' '}
        <span data-testid="shopping-cart-size">{count}</span>
      </button>
    );
  }
}

GoToCart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  count: PropTypes.number.isRequired,
};
