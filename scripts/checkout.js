
import {cart, removeFromCart} from '../data/cart.js'; // Importing the cart array from cart.js.
import {products} from '../data/products.js'; // Importing the products array from products.js.

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; // Importing dayjs  by ESM (Ecma Script Module) from a CDN.
// this is a default export, we can use this when we want to export 1 thing from a module.

import {deliveryOptions} from '../data/deliveryOption.js'; // Importing the deliveryOption array from deliveryOption.js.


const today = dayjs(); // Getting today's date using dayjs
const deliveryDate = today.add(7, 'days'); // Adding 7 days to today's date

console.log(deliveryDate.format('dddd, MMMM D')); // Formatting the date to a readable format
// Example: "Tuesday, May 15"
// dddd - Full name of the day
// MMMM - Full name of the month
// D - Day of the month without leading zeros



let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  
  let matchingProduct;

  products.forEach((product) => {
    if(product.id === productId){
      matchingProduct = product;
    }
  });

    const deliveryOptionId = cartItem.deliveryOptions;

    let delOption;
    deliveryOptions.forEach((Option) => {
      if (Option.id === deliveryOptionId) {
        delOption = Option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(delOption.deliveryDays, 'days'); 
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.name}">

        <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
            <div class="product-price">
             $${(matchingProduct.priceCents / 100).toFixed(2)}
            </div>
            <div class="product-quantity">
              <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery Options
                </div>
                ${deliveryOptionHTML(matchingProduct, cartItem)}
              </div>

            </div>
          </div>

    `
});

function deliveryOptionHTML(matchingProduct, cartItem){

  let HTMLDays = '';

  deliveryOptions.forEach((option) => {
  
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'days'); // Adding deliveryDays to today's date
    const dateString = deliveryDate.format('dddd, MMMM D'); // Formatting the date to a readable format

    const priceString = option.priceCents === 0 ? 'FREE Shipping' : `$${(option.priceCents / 100).toFixed(2)} - Shipping`;

    const isChecked = option.id === cartItem.deliveryOptions; // Check if this option is selected in the cart

    HTMLDays += `
      <div class="delivery-option">
        <input type="radio" ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>         
    `
  });
  return HTMLDays;
}


document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-quantity').forEach((link) => {
  link.addEventListener('click', () => {
    const delProductId =  link.dataset.productId;
    
    removeFromCart(delProductId);

    document.querySelector(`.js-cart-item-container-${delProductId}`).remove();
   
  })
})

document.querySelectorAll('.js-update-quantity').forEach((link) => {
  link.addEventListener('click',() => {
    const updateProductId = link.dataset.productId;

    updateFromCart(updateProductId);
  
    
  })
})


