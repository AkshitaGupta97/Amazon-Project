
class Cart {
    cartItems = undefined;
    localStorageKey = undefined;
     
    loadFromStorage(){
            // here this represent cart
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];

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
    }
    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }
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
    }
    removeFromCart(productId){
        const newCart = [];
        cart.forEach((cartItem) => {
            if(cartItem.productId !== productId){
            newCart.push(cartItem);
            }
        });
        cart = newCart;
        this.saveToStorage();
    }     
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

// this is oops concept
const cart = new Cart();
const businessCart = new Cart();
cart.loadFromStorage = 'cart-oop';
businessCart.loadFromStorage = 'cart-business';

console.log(cart);
console.log(businessCart);

