export async function getCategories() {
  const endpointCategories = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(endpointCategories);
  return response.json();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const responseByCategoryIdAndQuery = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  return responseByCategoryIdAndQuery.json();
}

export async function getProductById(id) {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
  const product = await fetch(`https://api.mercadolibre.com/items/${id}`);
  return product.json();
}
