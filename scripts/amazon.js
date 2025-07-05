
const products = [
    {
        imgage: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
        name: " Plain Cotton T-Shirt",
        rating: {
            stars: 4.5,
            count: 120
        },
        priceCents: 1090,
    },

    {
        imgage: "images/products/intermediate-composite-basketball.jpg",
        name: " Basketball",
        rating: {
            stars: 3.5,
            count: 150
        },
        priceCents: 2095,
    },

    {
        imgage: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: " Cotton Socks - 6 Pairs",
        rating: {
            stars: 5.0,
            count: 200
        },
        priceCents: 799,
    }

];
// This code will generate the HTML for each product and append it to the container
let productsHTML = '';

products.forEach((product) => {
    productsHTML +=  `
    
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.imgage}" alt="${product.name}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"  src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
             ${product.rating.count} 
            </div>
          </div>

          <div class="product-price">
            ${(product.priceCents / 100).toFixed(2)}  // to convert into decimal
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

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png"> Added
          </div>

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>

    `
});

const jsProduct = document.querySelector('.products-grid');
jsProduct.innerHTML = productsHTML;




