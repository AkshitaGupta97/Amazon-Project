
import { deliveryOptions } from '../data/deliveryOption.js';

function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,

        loadFromStorage: function(){
            // here this represent cart
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];

            if(!Array.isArray(this.cartItems)) {
                this.cartItems = [
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
        },
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
        addToCart(productId){
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if(productId === cartItem.productId){
                matchingItem = cartItem;
                }
            });

            if(matchingItem){
                matchingItem.quantity += 1;
            }
            else {
                this.cartItems.push({
                productId: productId,
                deliveryOptionId: '1', // Default delivery option
                quantity: 1
                })
            }
            this.saveToStorage();
        },
        removeFromCart(productId){
            const newCart = [];
            
            cart.forEach((cartItem) => {
                if(cartItem.productId !== productId){
                newCart.push(cartItem);
                }
            });

            cart = newCart;
            this.saveToStorage();
        },
        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem;

            cart.forEach((cartItem) => {
                if(productId === cartItem.productId){
                matchingItem = cartItem;
                }
            });

            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }

    }
    return cart;
}

// this is oops concept
const cart = Cart('cart-oop');

const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);

// oops are important as it provide multiple uses of codes, makes easy to create multiple objects