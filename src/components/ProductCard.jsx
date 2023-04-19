import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import React, { Component } from 'react';

export default class ProductCard extends Component {
  render() {
    const { product, isOnPreview } = this.props;
    return (
      <div>
        <Link data-testid="product-detail-link" to={ `/product/${product.id}` }>
          <li data-testid="product">
            <h3 data-testid="product-detail-name">{product.title}</h3>
            <img
              data-testid="product-detail-image"
              src={ product.thumbnail }
              alt={ product.title }
            />
            <h3 data-testid="product-detail-price">
              R$
              { product.price.toFixed(2) }
            </h3>
            {isOnPreview && (
              <div style={ { maxHeight: '500px', overflowY: 'overlay' } }>
                { product
              && product.attributes.map(({ name,
                value_name: valueName, id }) => (
                (
                  <p key={ id }>
                    <strong>{`${name}: `}</strong>
                    {valueName}
                  </p>)))}
              </div>)}
          </li>
        </Link>
        <button data-testid="shopping-cart-button">Adicionar ao carrinho</button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    attributes: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      value_name: PropTypes.string,
    }),
  }),
  isOnPreview: PropTypes.bool,
}.isRequired;

ProductCard.defaultProps = {
  isOnPreview: false,
};
