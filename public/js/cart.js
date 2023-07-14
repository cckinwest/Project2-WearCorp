const addToBasket = async () => {
  const productName = document.querySelector('#productName').textContent;
  const unitPrice = parseFloat(document.querySelector('#price').textContent);
  const productId = parseInt(document.querySelector('#productId').textContent);
  var stock = parseInt(document.querySelector('#stock').textContent);
  const quantity = document.querySelector('#quantity').value;

  var basket = {
    order: [],
    totalValue: 0,
  };

  if (localStorage.getItem('shoppingCart')) {
    basket = JSON.parse(localStorage.getItem('shoppingCart'));
  }

  const item = {
    productName: productName,
    unitPrice: unitPrice,
    quantity: quantity,
  };

  basket.order.push(item);
  stock -= quantity;
  basket.totalValue += unitPrice * quantity;

  localStorage.setItem('shoppingCart', JSON.stringify(basket));

  const response = await fetch(`/api/products/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({
      product_name: productName,
      stock: stock,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.querySelector('#stock').textContent = stock;
  }

  return;
};

document.querySelector('#addButton').addEventListener('click', addToBasket);
