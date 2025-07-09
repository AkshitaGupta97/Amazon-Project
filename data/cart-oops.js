
import { deliveryOptions } from './deliveryOption.js';

// this is oops concept

const cart = {
    cartItems: undefined,

    loadFromStorage: function(){
        // here this represent cart
        this.cartItems = JSON.parse(localStorage.getItem('cart-oop')) || [];

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
        localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
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

cart.loadFromStorage();

// oops are important as it provide multiple uses of codes, makes easy to create multiple objects

const cartBusiness = {
    cartItems: undefined,

    loadFromStorage: function(){
        // here this represent cart
        this.cartItems = JSON.parse(localStorage.getItem('cart-business')) || [];

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
        localStorage.setItem('cart-business', JSON.stringify(this.cartItems));
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
cartBusiness.loadFromStorage();

/*
console.log("Business Cart = ")
console.log(cartBusiness);
console.log("cart display = ")
console.log(cart);
*/


