import {addToCart, cart, loadFromStorage} from '../../data/cart.js'
import { deliveryOptions } from '../../data/deliveryOption.js';

describe('Test Suit: addToCart', () => {
    it('adds an existing product to card', () =>{
        spyOn(localStorage, 'setItem')

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                deliveryOptionId: '1',
            }]);
        });
        
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);

       // expect(localStorage.setItem).toHaveBeenCalledTime(1); // expect gives object

       expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        
       expect(cart[0].quantity).toEqual(2);
    });

    it('adds a new product to card', () =>{  // spyOn -> to create mocks

        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);

       // expect(localStorage.setItem).toHaveBeenCalledTime(1); // expect gives object

       expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        
       expect(cart[0].quantity).toEqual(1);


    });

});