var basket = {
  order: [],
  totalValue: 0,
};

if (localStorage.getItem('shoppingCart')) {
  basket = JSON.parse(localStorage.getItem('shoppingCart'));
  document.querySelector('#totalValue').textContent = basket.totalValue;
}

const addToCart = async () => {
  const productName = document.querySelector('#productName').textContent;
  const unitPrice = parseFloat(document.querySelector('#price').textContent);
  const productId = parseInt(document.querySelector('#productId').textContent);
  var stock = parseInt(document.querySelector('#stock').textContent);
  const quantity = document.querySelector('#quantity').value;

  const cartItem = {
    productName: productName,
    unitPrice: unitPrice,
    quantity: quantity,
  };

  basket.order.push(cartItem);
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
    document.querySelector('#totalValue').textContent = basket.totalValue;
  }

  return;
};

document
  .querySelector('#addToBasketButton')
  .addEventListener('click', addToCart);
/*
const cartItems = [];
const cartElement = document.getElementById('cart');

function addToCart(price, description) {
  console.log('Adding to cart: ', price, description);

  const cartItem = {
    price: price,
    description: description,
  };

  cartItems.push(cartItem);

  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  cartElement.textContent = getCartItemSummary();
}

function getCartItemSummary() {
  const items = JSON.parse(localStorage.getItem('cartItems'));

  let summary = '';

  if (!items) {
    summary = 'No items in cart';
  } else {
    let totalPrice = 0;
    for (let i = 0; i < items.length; i++) {
      totalPrice += items[i].price;
    }

    summary = items.length + ' items (£' + totalPrice.toFixed(2) + ')';
  }

  return summary;
}

function displayCartItems() {
  const items = JSON.parse(localStorage.getItem('cartItems'));

  if (!items) {
    return;
  }

  const cartList = document.getElementById('basket_summary');
  cartList.innerHTML = '';

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const itemElement = document.createElement('li');

    itemElement.textContent =
      item.description + ' (£' + item.price.toFixed(2) + ')';

    cartList.appendChild(itemElement);
  }
}

cartElement.textContent = getCartItemSummary();

const addToBasketButton = document.getElementById('addToBasketButton');
if (addToBasketButton) {
  addToBasketButton.addEventListener('click', function () {
    const productPrice = parseFloat('{{product.price}}');
    const productDescription = '{{product.product_name}}';

    addToCart(productPrice, productDescription);
    displayCartItems();
  });
}

displayCartItems();*/
