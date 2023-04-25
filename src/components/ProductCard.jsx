import PropTypes from 'prop-types';
import React, { Component } from 'react';
/* import { Link } from 'react-router-dom'; */
import AddToCart from './AddToCart';

export default class ProductCard extends Component {
  render() {
    const { product, isOnPreview, addCount, history } = this.props;
    return (
      <div>
        {/* <Link
          data-testid="product-detail-link"
          to={ `/product/${product.id}` }
          onClick={ (e) => isOnPreview && e.preventDefault() }
          style={ {
            cursor: isOnPreview && 'default',
          } }
        > */}
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
          {product.shipping.free_shipping
              && <p data-testid="free-shipping">Frete Grátis</p>}
        </li>
        {/* </Link> */}
        { !isOnPreview && (
          <button
            data-testid="product-detail-link"
            type="button"
            onClick={ () => history.push(`/product/${product.id}`) }
          >
            Ver detalhes
          </button>)}
        <AddToCart
          product={ product }
          isOnPreview={ isOnPreview }
          addCount={ addCount }
        />
      </div>
    );
  }
}

ProductCard.propTypes = {
  addCount: PropTypes.func.isRequired,
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
