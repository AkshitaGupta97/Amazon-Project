
export const cart = []


function updateCartQuantity(){
  let cartQuantity = 0;
    cart.forEach((item) => {
    cartQuantity += item.quantity;
    });

    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}