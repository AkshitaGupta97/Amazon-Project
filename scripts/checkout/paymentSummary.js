
import {cart} from '../../data/cart.js'; // Importing the cart array from cart.js.
import {products, getProductId} from '../../data/products.js'; // Importing the products array from products.js.
import { getDeliveryOptionById } from '../../data/deliveryOption.js';
import { formatCurrency } from '../utility_code/formatMoney.js'; // Importing the formatCurrency function to format the price in dollars.

export function renderPaymentSummary(){

    let productPriceCents = 0; // Initialize a variable to hold the total price in cents
    let shippingPriceCents = 0; // Initialize a variable to hold the shipping price in cents

    cart.forEach((cartItem) => {
        const product = getProductId(cartItem.productId); // Using the getProductId function to find the matching product
        productPriceCents = product.priceCents * cartItem.quantity;

        const deliveryOption =  getDeliveryOptionById(cartItem.deliveryOptionId); // Using the getDeliveryOptionById function to find the matching delivery option
        
        shippingPriceCents += deliveryOption.priceCents
    })
    
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents; // Calculate the total before tax in cents

    const taxCents = totalBeforeTaxCents * 0.1; // as 10% tax = 10/100 = 0.1 

    const totalCents = totalBeforeTaxCents + taxCents; // Calculate the total in cents

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    
    `;

    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML; // Render the payment summary HTML into the payment summary section of the page
    
}

/*
    TEST OUR CODE 
    ****** MANUAL TESTING   *****  not goot practice of testing, hard to re-test the same code manualy

    1. right click on any file
    2. open with live server
    
    ******  AUTOAMTED TESTING  *******   test via code


*/
