import {cart} from '../../data/cart.js'
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {products} from '../../data/products.js';  
import { addOrder } from '../order.js';

getDeliveryOption();

export function paymentSummary(){
    let mactchingItem;
    let productCost;
    let totalCost = 0;
    let ShippingPrice = 0;
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
    // console.log(orderTotal);

    let paymentSummaryHtml = `
    <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div class="js-cart-quantity-payment-summary">Items (0):</div>
    <div class="payment-summary-money">$${totalCost.toFixed(2)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${(ShippingPrice).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${(totalBeforeTax).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (18%):</div>
    <div class="payment-summary-money">$${(totalAfterTax).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${(totalAfterTax).toFixed(2)}</div>
  </div>

  <button class="js-place-order-btn place-order-button button-primary">
    Place your order
  </button>`;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
  document.querySelector('.js-place-order-btn').addEventListener('click',async () => {
  const reponse = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
                  },
        body: JSON.stringify({
          cart: cart
                            })
        })
        const order = await reponse.json();
        addOrder(order);
        window.location.href='orders.html';
  });


  updateCartQuantityPaymentSummary();
  return orderTotal;
}

export function updateCartQuantityPaymentSummary(){
    let totalQuantity = 0;
  
    cart.forEach((items)=>{
        totalQuantity += items.quantity;
    });
    // console.log(totalQuantity);
    document.querySelector('.js-cart-quantity-payment-summary').innerHTML=`Items (${totalQuantity})`;
  }
  