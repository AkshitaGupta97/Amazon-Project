
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suit: renderOrderSummary', () => {
    
    const productID1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    const productID2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        document.querySelector('js-test-container').innerHTML = 
        `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        
        `;
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
            {
                productId: productID1,
                deliveryOptionId: '1',
                quantity: 2
            },
            {
                productId: productID2,
                deliveryOptionId: '2',
                quantity: 1
            },
            ]);
        });
                
        loadFromStorage();
        renderOrderSummary();
    })


    it('display the cart', () => {

        expect(document.querySelectorAll('.js-test-cart').length).toEqual(2);

        expect(
            document.querySelector(`.js-test-quantity-${productID1}`).innerText
        ).toContain('Quantity: 2');

        it('remove Product', () => {
            spyOn(localStorage, 'setItem')
            const productID1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
            spyOn(localStorage, 'getItem').and.callFake(() => {
                return JSON.stringify([
                {
                    productId: productID1,
                    deliveryOptionId: '1',
                    quantity: 2
                },
                {
                    productId: productID1,
                    deliveryOptionId: '2',
                    quantity: 1
                },
                ]);
            });
                    
            loadFromStorage();
            renderOrderSummary();

            expect(document.querySelector(`.js-delete-quantity-${productID1}`).click());

            expect(
                document.querySelector(`.js-test-container-${productID1}`)
            ).toEqual(null)

            expect(
                document.querySelector(`.js-test-container-${productID2}`)
            ).not.toEqual(null)

            expect(cart.length).toEqual(1);

            document.querySelector('js-test-container').innerHTML = '';

        })

    })
})
