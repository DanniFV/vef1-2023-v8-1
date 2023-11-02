import { createCartLine, showCartContent } from './lib/ui.js';
import { formatNumber } from './lib/helpers.js';

const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];

const addToCartForms = document.querySelectorAll('.add');

function addProductToCart(product, quantity) {
  const cart = document.querySelector('.cart-content');

  if (!cart) {
    console.warn('fann ekki .cart');
    return;
  }
  
const cartLine = cart.querySelector(`[data-cart-product-id="${product.id}"]`);
if (cartLine) {
    let quantityElement = cartLine.querySelector('td:nth-child(2)');
    let totalPriceElement = cartLine.querySelector('td:nth-child(4) .price');
    if (quantityElement && totalPriceElement) {
      let newQuantity = parseInt(quantityElement.textContent || '0') + quantity;
      quantityElement.textContent = newQuantity.toString();
      totalPriceElement.textContent = formatNumber(product.price * newQuantity);
    }
  } else {
    cart.appendChild(createCartLine(product, quantity));
  }

  showCartContent(true);
  updateCartTotal();
}

function submitHandler(event) {
  event.preventDefault();
  const parent = event.target.closest('tr')
  const productId = Number.parseInt(parent.dataset.productId);
  const product = products.find((i) => i.id === productId);

  const input = parent.querySelector('input[type="number"]');
  const quantity = input ? parseInt(input.value) : 1;

  if (product) {
    addProductToCart(product, quantity);
  } else {
  console.warn('vara ekki fundin');
  }
}

addToCartForms.forEach(form => {
  form.addEventListener('submit', submitHandler);
});

function updateCartTotal(){
  const cartLines = document.querySelectorAll('.cart-content tr');
  let total = 0;

  cartLines.forEach((line) => {

    if (line instanceof HTMLElement) {
    const productId = parseInt(line.dataset.cartProductId || '0');
    const product = products.find((p) => p.id === productId);
    
    if (product) {
      const quantityElement = line.querySelector('td:nth-child(2)');
      const quantityText = quantityElement ? quantityElement.textContent : '0';
      const quantity = parseInt(quantityText, 10);
      total += product.price * quantity;
    }
  }
  });

  const totalElement = document.querySelector('.cart-total');
  if (totalElement) {
    totalElement.textContent = formatNumber(total);
  }

  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Your code to handle the form data and show the receipt
  });
  
}



// TODO: Add the event handler for submitting the order here if required
// You will need to provide the implementation based on your specific UI and requirements
