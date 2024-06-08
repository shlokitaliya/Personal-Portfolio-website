import { products, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart.js";
import { getDeliveryOption } from "../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function renderTracking(){
await loadProductsFetch();

const url = new URL(window.location.href);
const productIdhere = url.searchParams.get('orderId');
console.log( url.searchParams.get('orderId'))
let sameProduct;
let sameCartProduct;


products.forEach((product) => {
    if(product.id === productIdhere){
sameProduct = product;
    }
})
let deliveryOptions;

cart.forEach(cartItem => {
   
    if(cartItem.productId === sameProduct.id){
        sameCartProduct = cartItem;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
        deliveryOptions = deliveryOption;
    }
});
const today = dayjs();
    const Today = today.add(deliveryOptions.deliveryDays,'day');
    const todayDate = Today.format(' dddd, D MMMM');
    
// console.log(sameCartProduct);
let html=`<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${todayDate}
        </div>

        <div class="product-info">
          ${sameProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${sameCartProduct.quantity}
        </div>

        <img class="product-image" src=${sameProduct.image}>

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`;

        // console.log(html)
        document.querySelector('.js-track-innerhtml').innerHTML=html;
}

renderTracking();