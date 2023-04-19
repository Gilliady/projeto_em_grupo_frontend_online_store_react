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
      </div>
    );
  }
}
