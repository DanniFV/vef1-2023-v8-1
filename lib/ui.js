import { formatNumber } from './helpers.js';

function deleteLineFromCart (event) {
  event.preventDefault();
  const lineToDelete = event.submitter.closest('tr');
  lineToDelete.parentElement.removeChild(lineToDelete);
}

export function createCartLine(product, quantity) {
  const tr = document.createElement('tr');
  tr.setAttribute('data-cart-product-id', product.id);

  tr.innerHTML = `
    <td>${product.title}</td>
    <td>${quantity}</td>
    <td><span class="price">${formatNumber(product.price)}</span></td>
    <td><span class="price">${formatNumber(product.price * quantity)}</span></td>
    <td>
      <form class="remove" method="post">
        <button type="button">Eyða</button>
      </form>
    </td>
  `;

  const formElement = document.createElement('form');
  formElement.addEventListener('submit', deleteLineFromCart);

  function updateCartTotal(){
    const cartLines = document.querySelectorAll('.cart-content tr');
    let total = 0;
  }

  const removeButton = tr.querySelector('button[type="button"]');

  removeButton.addEventListener('click', () => {
    tr.remove(); // Removes the row from the DOM

    updateCartTotal(); // Updates the total price in the cart

    // Check if there are no more rows in the cart
    const cartTableBody = document.querySelector('.table-content tbody');
    if (cartTableBody instanceof HTMLTableSectionElement && cartTableBody.rows.length === 0) {
      showCartContent(false); // Hide cart content if empty
      updateCartTotal()
    }
  });
updateCartTotal();
updateCartTotal()
  return tr;
}


  
 
 /* const cartLineElement = document.createElement('div');
  const cartLineTitleElement = document.createElement('strong');
  const cartLinePriceElement = document.createElement('span');
  cartLinePriceElement.textContent = formatNumber(product.price);

  cartLineTitleElement.textContent = product.title;

  cartLineElement.appendChild(cartLineTitleElement);
  cartLineElement.appendChild(cartLinePriceElement);

  // TODO hér þarf að búa til eventListener sem leyfir að eyða línu úr körfu

  return cartLineElement; */


/**
 * Sýna efni körfu eða ekki.
 * @param {boolean} show Sýna körfu eða ekki
 */
export function showCartContent(show = true) {
  // Finnum element sem inniheldur körfuna
  const cartElement = document.querySelector('.cart');

  if (!cartElement) {
    console.warn('fann ekki .cart');
    return;
  }

  const emptyMessage = cartElement.querySelector('.empty-message');
  const cartContent = cartElement.querySelector('.cart-content');

  if (!emptyMessage || !cartContent) {
    console.warn('fann ekki element');
    return;
  }

  if (show) {
    emptyMessage.classList.add('hidden');
    cartContent.classList.remove('hidden');
  } else {
    emptyMessage.classList.remove('hidden');
    cartContent.classList.add('hidden');
  }
}