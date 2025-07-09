
import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js'; // Importing the cart array from cart.js.
import {products, getProductId} from '../../data/products.js'; // Importing the products array from products.js.

import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; // Importing dayjs  by ESM (Ecma Script Module) from a CDN.
// this is a default export, we can use this when we want to export 1 thing from a module.

import {deliveryOptions, getDeliveryOptionById} from '../../data/deliveryOption.js'; // Importing the deliveryOption array from deliveryOption.js.

import { renderPaymentSummary } from './paymentSummary.js';

// single dot ./ -> move from current directory/ folder to the parent directory
// double dot ../ -> move from parent directory to the grandparent directory


//const today = dayjs(); // Getting today's date using dayjs
//const deliveryDate = today.add(7, 'days'); // Adding 7 days to today's date

//console.log(deliveryDate.format('dddd, MMMM D')); // Formatting the date to a readable format
// Example: "Tuesday, May 15"
// dddd - Full name of the day
// MMMM - Full name of the month
// D - Day of the month without leading zeros



export function renderOrderSummary(){

  let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
      const productId = cartItem.productId;
      
      const matchingProduct = getProductId(productId); // Using the getProductId function to find the matching product

      // access this function from product.js file
      /*let matchingProduct;
      products.forEach((product) => {
        if(product.id === productId){
          matchingProduct = product;
        }
      });
      */

        const deliveryOptionId = cartItem.deliveryOptionId;
        
        const deliveryOption = getDeliveryOptionById(deliveryOptionId); // Using the getDeliveryOptionById function to find the matching delivery option
               
        /*let deliveryOption;
        deliveryOptions.forEach((option) => {
          if(option.id == deliveryOptionId){    // as i want type coercion here, using abstract equality because deliveryOptionId is a s+tring
            deliveryOption = option;
          }
        })
        */ 
       // or access this function from deliveryOption.js file


        if (!deliveryOption) {
          // Handle missing delivery option gracefully
          console.error(`Delivery option not found for id: ${deliveryOptionId}`);
          return; // Skip rendering this cart item
        }
      
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D'); // Formatting the date to a readable format
        
        cartSummaryHTML += `
        <div class="cart-item-container js-test-cart
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
                <div class="product-quantity js-test-quantity-${matchingProduct.id}">
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

        const isChecked = `${option.id}` === `${cartItem.deliveryOptionId}`;    // Check if this option is selected in the cart


        HTMLDays += `
          <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${option.id}">
            <input
              type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
              value="${option.id}" 
              data-product-id="${matchingProduct.id}"
              data-delivery-option-id="${option.id}"
            >

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

        renderPaymentSummary();
      
      })
    })

    document.querySelectorAll('.js-update-quantity').forEach((link) => {
      link.addEventListener('click',() => {
        const updateProductId = link.dataset.productId;

        updateFromCart(updateProductId);
             
      })
    })

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
      
        updateDeliveryOption(productId, deliveryOptionId);


        //  instead of using dom to update the page directly we need to re-run all this page and regenerate the HTML
        // This is because the delivery option is now updated in the cart, and we need to so use renderOrderSummary to reflect that change

        renderOrderSummary(); // Re-render the order summary to reflect the updated delivery option

        renderPaymentSummary(); // i want the payment as when we change the shipping option the payment mode also changes

      });
    });

}

//renderOrderSummary(); // Calling the function to render the order summary
// now from checkout.js file

// const productId = element.dataset.productId;
    // const deliverOptionId = element.dataset.deliveryOptionId;

    // Using destructuring to extract productId and deliverOptionId from the dataset


// MVC Pattern Explanation: design pattern helps to design the code
// Model: The data (cart, products, deliveryOptions) is the model.
// View: The HTML structure and rendering functions (like renderOrderSummary) are the view.
// Controller: The event listeners and functions that manipulate the data (like addToCart, remove) to interact with page
// as we are using the MVC pattern, the controller is responsible for handling user interactions and updating the model and view accordingly.
// by using renderOrderSummary, we are updating the view based on the current state of the model (cart, products, deliveryOptions). without duplicating the code, we are ensuring that the view is always in sync with the model.

// model  = save the data
// view = generate data via html
// controller = make it interactive by adding event listeners and functions to manipulate the data