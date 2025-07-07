
export let cart = JSON.parse(localStorage.getItem('cart'))

if(!Array.isArray(cart)){ // check if cart is not an array or null
  // If cart is not an array, initialize it with some default items
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptions: '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptions: '2'
    }
  ];
  
  saveToStorage(); // Save the initialized cart to localStorage
}


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
  //console.log('Cart saved to localStorage:', cart);
  
}

export function addToCart (productId) {
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
        deliveryOptions: '1' // Default delivery option
      });  
    }
    
    saveToStorage();
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {  // agar equal raheta toh delete karna padta, and unequal ko cart mein rakha jaa rha hai
    if(cartItem.productId !== productId){
      newCart.push(cartItem); // push the full cart item, not just productId
    }
  });

  //cart = newCart;

  cart.length = 0; // Clear the existing cart array
  cart.push(...newCart); // Push all items from newCart into the cart array
  // This ensures that the cart array is updated with the new items

  saveToStorage(); 
}

/*
export function updateFromCart(productId) {
  
}
*/
