import {cart} from '../data/cart.js';
import {getDeliveryOption} from '../data/deliveryOptions.js';
import {paymentSummary} from './checkout/paymentSummary.js';
import {products, loadProductsFetch} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}
// let orderProduct;
// function getCartItems(){
//     cart.forEach(product => {
//         orderProduct = product;
//     });
// }
// console.log(cart)


// console.log(todayDate)


let totalPriceHere = 0;
async function totalPrice(){
    await loadProductsFetch();
    let mactchingItem;
    let productCost;
    let totalCost = 0;
    let ShippingPrice = 0;
    let totalCartItems=0;
cart.forEach((cartItem) => {
    totalCartItems += cartItem.quantity;
})
// console.log(totalCartItems)

    const today = dayjs();
const Today = today.add(0,'day');

const todayDate = Today.format('MMMM D');
    cart.forEach( cartItem => {

        mactchingItem = cartItem.productId;

        products.forEach(products => {
            if(products.id === mactchingItem)
                {
                    productCost = cartItem.quantity * products.priceCents;
            }})
           totalCost += (((Number(productCost))/100));


           
       

           const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);

        ShippingPrice += (Number(deliveryOption.priceCents))/100;
        // console.log(totalCost)
        // console.log(ShippingPrice)
    });

    let totalBeforeTax = totalCost + ShippingPrice;
    let totalAfterTax = (totalBeforeTax * 0.18) + totalBeforeTax;
    // console.log(totalBeforeTax)
    // console.log(totalAfterTax)
    // console.log((Math.round(totalCost)/100).toFixed(2))
    const orderTotal = totalCost + ShippingPrice + totalAfterTax + totalBeforeTax ;
    totalPriceHere = orderTotal;
    // console.log(totalPriceHere)

    function renderOrders(){
        let html=``;
        let sameProduct;
    
        cart.forEach(cartItem => {
          products.forEach((product) => {
            if(cartItem.productId === product.id){
                sameProduct = product;
            }
          })

          const deliveryOptions = getDeliveryOption(cartItem.deliveryOptionsId);
          const deliveryDate = today.add(deliveryOptions.deliveryDays,'day')
          const todayDates = deliveryDate.format('MMMM D');
          console.log(todayDates);
          
            let innerHtml=`<div class="product-image-container">
                  <img src=${sameProduct.image}>
                </div>
    
                <div class="product-details">
                  <div class="product-name">
                    ${sameProduct.name}
                  </div>
                  <div class="product-delivery-date">
                    Arriving on: ${todayDates}
                  </div>
                  <div class="product-quantity">
                    Quantity: ${cartItem.quantity}
                  </div>
                <a href="index.html">
                  <button class="buy-again-button button-primary js-buy-it-again-btn">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                  </button>
                </a>
                </div>
    
                <div class="product-actions js-track">
                  <a href="tracking.html?orderId=${sameProduct.id}">
                    <button class="track-package-button button-secondary"
                     data-product-id=${sameProduct.id}>
                      Track package
                    </button>
                  </a>
                </div>`;
            html +=innerHtml;
           
        });
        document.querySelector('.order-your').innerHTML = html;
    // console.log(html)
    }

    document.querySelector('.order-page-total-price').innerHTML=`$${totalAfterTax.toFixed(2)}`;
    
    document.querySelector('.today-date').innerHTML=`${todayDate}`;
    
    document.querySelector('.cart-quantity').innerHTML = totalCartItems;
   

    renderOrders();
}
totalPrice();


// const track = document.querySelectorAll('.js-track');
// track.forEach((traking) => {
// traking.addEventListener('click', () => {
//   console.log('hello')
// })
// })



