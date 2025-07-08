
import { deliveryOptions } from './deliveryOption.js';

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

if(!Array.isArray(cart)) {
  cart = [
    {
      productId: '1',
      deliveryOptionId: '1',
      quantity: 2
    },
    {
      productId: '2',
      deliveryOptionId: '2',
      quantity: 1
    },
  ]
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

console.log(cart);


cart.forEach(cartItem => {
  const option = deliveryOptions.find(opt => opt.id === cartItem.deliveryOptionId);

  if (option) {
    console.log(`Delivery: ${option.id} days, ₹${(option.priceCents / 100).toFixed(2)}`);
  } else {
    console.warn(`No delivery option found for ID: ${cartItem.deliveryOptionId}`);
  }
});


cart.forEach(option => {
  console.log(option.deliveryOptionId);
});

export function addToCart(productId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += 1;
  }
  else {
    cart.push({
      productId: productId,
      deliveryOptionId: '1', // Default delivery option
      quantity: 1
    })
  }

  saveToStorage();

}


export function removeFromCart(productId){
  const newCart = [];
 
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}
