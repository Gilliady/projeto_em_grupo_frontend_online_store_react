import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddToCart extends Component {
  addItemToCart = () => {
    const { addCount } = this.props;
    const { product: { id,
      title,
      price,
      thumbnail,
      available_quantity: availableQuantity,
    } } = this.props;
    const previousStorage = JSON.parse(localStorage.getItem('cart'));
    const getItem = previousStorage.find(({ id: storageId }) => id === storageId);
    if (getItem && getItem.quantity === availableQuantity) return;
    if (getItem) {
      const newStorage = previousStorage.map((product) => {
        if (id === product.id && product.quantity < availableQuantity) {
          product.quantity += 1;
        }
        return product;
      });
      localStorage.setItem('cart', JSON.stringify(newStorage));
      addCount();
      return;
    }
    localStorage
      .setItem('cart', JSON.stringify([...previousStorage, { id,
        title,
        price,
        thumbnail,
        quantity: 1,
        availableQuantity,
      }]));
    addCount();
  };

  render() {
    const { isOnPreview } = this.props;
    return (
      <button
        data-testid={ !isOnPreview
          ? 'product-add-to-cart'
          : 'product-detail-add-to-cart' }
        onClick={ this.addItemToCart }
      >
        Adicionar ao carrinho
      </button>
    );
  }
}

AddToCart.propTypes = {
  addCount: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.string,
    price: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }),
}.isRequired;
