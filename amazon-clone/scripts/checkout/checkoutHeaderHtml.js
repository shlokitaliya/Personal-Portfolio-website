import { cart } from "../../data/cart.js";
export function updateCartQuantityCheckoutPageHeader(){
    let totalQuantity = 0;
  
    cart.forEach((items)=>{
        totalQuantity += items.quantity;
    });
    document.querySelector('.cart-quantity-checkout-page-header').innerHTML=totalQuantity + ` Items`;
  }