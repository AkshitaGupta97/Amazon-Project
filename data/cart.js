
export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  }
]


export function addToCart (productId) {
  let matchingItem;
  cart.forEach((item) => {
    if(productId == item.productId) {
      matchingItem = item;
    }

    if(matchingItem){
      matchingItem.quantity += 1
    }
    else{
      cart.push({
        productId: productId,
        quantity: 1,
      });  
    }
  })
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {  // agar equal raheta toh delete karna padta, and unequal ko cart mein rakha jaa rha hai
    if(cartItem.productId !== productId){
      newCart.push(cartItem); // push the full cart item, not just productId
    }
  });

  cart = newCart;
}


