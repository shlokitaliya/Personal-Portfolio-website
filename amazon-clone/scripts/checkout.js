import {renderWholePage} from '../scripts/checkout/orderSummary.js';
import {paymentSummary} from './checkout/paymentSummary.js';
// import { cart } from '../data/cart.js';
// import '../../data/backend-practise.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';

async function loadPage(){
    try{
        await loadProductsFetch();
    } catch(error){
        console.log('an unexpected error ocurred...')
    }
    
    renderWholePage();
    paymentSummary();
   
}
loadPage();

// loadProductsFetch().then(() => {
//     renderWholePage();
//     paymentSummary();
// })

// loadProducts(() => {
//     renderWholePage();
//     paymentSummary();
// })


