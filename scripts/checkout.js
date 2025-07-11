
import {renderOrderSummary} from './checkout/orderSummary.js'; // Importing the renderOrderSummary function from orderSummary.js

import { renderPaymentSummary} from './checkout/paymentSummary.js';

//import '../Extra-data/cart-class.js'; it is for practice

//import '../data/backend-Practice.js'

import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';

// Async await
// async -> makes a function and return a promise
    // to handle error in async we use try-catch
async function loadPage(){
    try{
        // we can manually create an error using throw, and it doesnot works for fututre error instead of it use reject.

      //  throw 'error1'; 

        await loadProductsFetch();

        const value = await new Promise((resolve, reject) => {
            loadCart(() => {
                resolve('value3');
              //  reject('error by reject')
            })
        })

    }catch(error){
        console.log('Unexpected error', 'Please try again later');
    }
    renderOrderSummary();
    renderPaymentSummary();

   // return 'value2' // == resolve(value2)
}
loadPage();


// PROMISES 
// fetch is used to return promise directly
/*
Promise.all([
    loadProductsFetch(),     
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    }),

]).then((values) => {
  //  console.log(values)
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
            resolve('value1');
        });      
    }),
}),
 
*/
/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value1');
    });
    
}).then((value) => {
    console.log(value);
    
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})
*/

/*
loadProducts(() => {
    loadCart(() => {
        renderOrderSummary(); // Calling the function to render the order summary
        renderPaymentSummary(); // Calling the function to render the payment summary
    });
    
});
*/

