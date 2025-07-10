
import {cart, addToCart} from '../data/cart.js'; // Importing the cart array from cart.js.  .. helps to get out of current file

import {products, loadProducts} from '../data/products.js'; // Importing the products array from products.js. 

// This code will generate the HTML for each product and append it to the container

loadProducts(renderProductsGrid);

function renderProductsGrid(){
  let productsHTML = '';

    // now this code is accessed from products.js file.
    //<img class="product-rating-stars" alt="" src="images/ratings/rating-${product.rating.stars * 10}.png"> -->

    //${product.extraInfoHTML()}  -> this is known as polymorphism, using method without knowing the class

    products.forEach((product) => {
        // Using template literals to create the HTML structure for each product
        productsHTML +=  ` 
        
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image" src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars" alt="" src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
              ${product.rating.count} 
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()} 

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png" alt=""> Added
            </div>

            <button title="addCart"
            class="add-to-cart-button js-add-to-cart  button-primary" 
            data-product-name="${product.name}" 
            data-product-id="${product.id}"
            alt="${product.name}">
              Add to Cart
            </button>
          </div>

        `
    });

    /* dataset = property is used to retrieve all the data from particular element */

    const jsProduct = document.querySelector('.products-grid');
    jsProduct.innerHTML = productsHTML;

    // here we are calling addToCart function from cart.js file
    // This function will be called when the "Add to Cart" button is clicked

    /*function addToCart (productId) {
      let matchingItem;
      cart.forEach((item) => {
        if(productId == item.productId) {
          matchingItem = item;
        }
      });

      if(matchingItem){
        matchingItem.quantity += 1
      }
      else{
        cart.push({
          productId: productId,
          quantity: 1,
        });  
      }
    }*/

    function updateCartQuantity(){
      let cartQuantity = 0;

      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.cart-quantity').innerHTML = cartQuantity;
    }

    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
          const productId =   button.dataset.productId; // dataset is used to retrieve the data from the button
          
          addToCart(productId)
          updateCartQuantity();
            
        })
    })

}

