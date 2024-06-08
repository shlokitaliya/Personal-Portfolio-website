import {cart, removeCartItem, updateCartQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products} from '../../data/products.js';
import {paymentSummary} from '../checkout/paymentSummary.js';
import {updateCartQuantityCheckoutPageHeader} from '../checkout/checkoutHeaderHtml.js';
// 
// an external library named dayjs which guves us the current day time date and month... this is a ESM script
// 
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';

export function renderWholePage(){

let matchingProduct;
let cartSummaryHtml='';
cartHtml();


function cartHtml(){
  cart.forEach((cartItems) => {
    const productId = cartItems.productId;
    

    products.forEach((product) => {
        if (productId === product.id) {
            matchingProduct=product;
        }
    })

    const deliveryOptionsId = cartItems.deliveryOptionsId;
     
    let deliveryOption = getDeliveryOption(deliveryOptionsId) ;
    const today = dayjs();
    const Today = today.add(deliveryOption.deliveryDays,'day');
    const todayDate = Today.format('D dddd,  MMMM');
    
    cartSummaryHtml+=`<div class="cart-item-container
    js-cart-item-container-${matchingProduct.id} ">
            <div class="delivery-date">
              Delivery date: ${todayDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${matchingProduct.getPriceCents()}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItems.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input type="number" class="quantity-input quantity-input-${matchingProduct.id}" value="${cartItems.quantity}" min="1" max="20">
                  <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsUpdateHtml(matchingProduct,cartItems)}
                
                
              </div>
            </div>
          </div> `;
          updateCartQuantityCheckoutPageHeader();
})

document.querySelector(".order-summary").innerHTML=cartSummaryHtml;
}

function deliveryOptionsUpdateHtml(matchingProduct,cartItems){
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {

    const today = dayjs();
    const Today = today.add(deliveryOption.deliveryDays,'day');
    const todayDate = Today.format('D dddd,  MMMM');

    // console.log(todayDate);
    const priceCents = deliveryOption.priceCents === 0? 'FREE -': `$${((deliveryOption.priceCents)/100).toFixed(2)} -`;

    const isChecked = deliveryOption.id === cartItems.deliveryOptionsId;

   html += `<div class="delivery-option js-delivery-option" 
   data-product-id="${matchingProduct.id}"
   data-delivery-options-id="${deliveryOption.id}">
    <input type="radio" 
    ${isChecked? 'checked':''}

     class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}">
    <div>
      <div class="delivery-option-date">
       ${todayDate}
      </div>
      <div class="delivery-option-price">
        ${priceCents} Shipping
      </div>
    </div>
  </div>`;
  })
  return html;
};



const link = document.querySelectorAll('.js-delete-link');
link.forEach((deleteLink) => {
    deleteLink.addEventListener('click', (e) => {
        const productId = deleteLink.dataset.productId;
        removeCartItem(productId);
        
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        updateCartQuantityCheckoutPageHeader();
        paymentSummary();
    })

})

// 
// it gets the update link and hides it shows the input fields and save btn
// 

const updateLink = document.querySelectorAll('.js-update-link');
updateLink.forEach((link) => {
  link.addEventListener('click', (e) => {
    const productId = link.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity')

    document.querySelector('.js-update-link').classList.add('update-display-style');
    
  })

})

// 
// code for the save button which hids the save and input and takes a number input and shows the update link again
// 

const saveLink = document.querySelectorAll('.js-save-link');
saveLink.forEach((link) => {
  link.addEventListener('click', (e) => {
    const productId = link.dataset.productId;

    let newQuantity = document.querySelector(`.quantity-input-${productId}`);
    let newQuantity1 = newQuantity.value;
    
    updateCartQuantity(productId,newQuantity1);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');
    

    document.querySelector('.js-update-link').classList.remove('update-display-style');

    document.querySelector(`.js-quantity-label-${productId}`).innerHTML=Number(newQuantity1);
    updateCartQuantityCheckoutPageHeader();
    paymentSummary();
  })

})

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
element.addEventListener('click',()=>{
  const {productId,deliveryOptionsId} = element.dataset;
  
  updateDeliveryOption(productId,deliveryOptionsId);
  renderWholePage();
  paymentSummary();
})
})

}

