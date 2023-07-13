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

displayCartItems();
