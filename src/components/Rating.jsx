import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Rating extends Component {
  state = {
    email: '',
    message: '',
    rating: '0',
    evaluations: [],
  };

  componentDidMount() {
    const { id } = this.props;
    const evaluations = JSON.parse(localStorage.getItem(id));
    if (evaluations) {
      this.setState({
        evaluations,
      });
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  submitRating = () => {
    const { email, message, rating } = this.state;
    const { id } = this.props;
    const previousEvaluations = JSON.parse(localStorage.getItem(id));
    if (previousEvaluations) {
      this.setState({
        evaluations: [...previousEvaluations, { email, message, rating }],
      }, () => {
        const { evaluations: updatedEvaluations } = this.state;
        localStorage
          .setItem(id, JSON.stringify(updatedEvaluations));
      });
    } else {
      this.setState({
        evaluations: [{ email, message, rating }],
      }, () => {
        const { evaluations: updatedEvaluations } = this.state;
        localStorage
          .setItem(id, JSON.stringify(updatedEvaluations));
      });
    }
    this.setState({
      email: '',
      message: '',
      rating: '0',
    });
  };

  render() {
    const { email, message, rating, evaluations } = this.state;
    return (
      <div>
        <label>
          <input
            onChange={ this.handleChange }
            type="email"
            placeholder="Email"
            value={ email }
            name="email"
            data-testid="product-detail-email"
          />
        </label>

        <label>
          <input
            checked={ Number(rating) >= 1 }
            onChange={ this.handleChange }
            value="1"
            data-testid="1-rating"
            name="rating"
            type="checkbox"
          />
        </label>

        <label>
          <input
            checked={ Number(rating) >= 2 }
            onChange={ this.handleChange }
            value="2"
            data-testid="2-rating"
            name="rating"
            type="checkbox"
          />
        </label>

        <label>
          <input
            checked={ Number(rating) >= Number('3') }
            onChange={ this.handleChange }
            value="3"
            data-testid="3-rating"
            name="rating"
            type="checkbox"
          />
        </label>

        <label>
          <input
            checked={ Number(rating) >= Number('4') }
            onChange={ this.handleChange }
            value="4"
            data-testid="4-rating"
            name="rating"
            type="checkbox"
          />
        </label>

        <label>
          <input
            checked={ Number(rating) >= Number('5') }
            onChange={ this.handleChange }
            value="5"
            data-testid="5-rating"
            name="rating"
            type="checkbox"
          />
        </label>

        <label>
          <textarea
            data-testid="product-detail-evaluation"
            placeholder="Mensagem(opcional)"
            cols="30"
            rows="10"
            name="message"
            value={ message }
            onChange={ this.handleChange }
          />
        </label>

        <button
          data-testid="submit-review-btn"
          onClick={ this.submitRating }
        >
          Enviar
        </button>
        {evaluations
          .map(({
            email: ratingEmail,
            rating: ratingRating, message: ratingMessage }, index) => (
            (
              <div key={ `${email}${index}` }>
                <p data-testid="review-card-email">{ratingEmail}</p>
                <p data-testid="review-card-rating">{ratingRating}</p>
                <p data-testid="review-card-evaluation">{ratingMessage}</p>
              </div>)
          ))}
      </div>
    );
  }
}

Rating.propTypes = {
  id: PropTypes.string.isRequired,
};
