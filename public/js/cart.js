const addToCart = async () => {
  const productName = document.querySelector('#productName').textContent;
  const unitPrice = parseFloat(document.querySelector('#price').textContent);
  const productId = parseInt(document.querySelector('#productId').textContent);
  var stock = parseInt(document.querySelector('#stock').textContent);
  const quantity = document.querySelector('#quantity').value;
  const userId = parseInt(document.querySelector('#userId').textContent);

  await fetch(`/api/orderItems`, {
    method: 'POST',
    body: JSON.stringify({
      quantity: quantity,
      confirmed: false,
      product_id: productId,
      user_id: userId,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  const response = await fetch(`/api/users/${userId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const userData = await response.json();

  var totalValue = parseFloat(userData.totalValue);

  stock -= quantity;
  totalValue += unitPrice * quantity;

  await fetch(`/api/products/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({
      product_name: productName,
      stock: stock,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({
      totalValue: totalValue,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  document.querySelector('#stock').textContent = stock;
  document.querySelector('#totalValue').textContent = totalValue;

  return;
};

document
  .querySelector('#addToBasketButton')
  .addEventListener('click', addToCart);
