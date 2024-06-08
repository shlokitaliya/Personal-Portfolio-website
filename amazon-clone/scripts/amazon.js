import {cart, addToCart, getSelectvalue} from '../data/cart.js';
import {products, loadProducts, loadProductsFetch} from '../data/products.js';

loadProducts(renderProductsGrid);
loadProductsFetch();

export function renderProductsGrid(){
  let productHtml=``;

  updateCartQuantity();
  // 
  //  the html code inserter as per the product data in the index file
  // 
  products.forEach((product,index)=>{
  productHtml+=`
  <div class="product-container">
  <div class="product-image-container">
    <img class="product-image"
      src="${product.image}">
  </div>

  <div class="product-name limit-text-to-2-lines">
  ${product.name}
  </div>

  <div class="product-rating-container">
    <img class="product-rating-stars"
      src="${product.getStarUrl()}">
    <div class="product-rating-count link-primary">
    ${product.rating.count}
    </div>
  </div>

  <div class="product-price">
    ${product.getPriceCents()}
  </div>

  <div class="product-quantity-container">
    <select class="product-quantity-value-${product.id}">
      <option selected value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
  </div>

  ${product.extraInfo()}

  <div class="product-spacer"></div>

  <div class="added-to-cart added-to-cart-id-${product.id}" data-product-id="${product.id}">
    <img src="images/icons/checkmark.png">
    Added
  </div>

  <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
    Add to Cart
  </button>
  </div>
  `;

  })

  document.querySelector('.js-product-grid').innerHTML=productHtml;


  // 
  // function to collecrt the number of orders from select attribut and pass it on 
  // 


  // 
  // this function add the added to cart popup
  //  on the product card when we click the ass to card button.
  // 
  function addedToCartPopup(button){

  document.querySelector(`.added-to-cart-id-${button.dataset.productId}`).classList.add('added-to-cart-done');

  }
  


  // 
      //    code to count the amount of products in cart
      //
  function updateCartQuantity(){
      let totalQuantity = 0;

      cart.forEach((items)=>{
          totalQuantity += items.quantity;
      });
      document.querySelector('.cart-quantity').innerHTML=totalQuantity;
  }
      

  document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
      button.addEventListener('click',()=>{
          const productId = button.dataset.productId;

          getSelectvalue(button);
          
          addedToCartPopup(button);

          addToCart(productId);
        
          updateCartQuantity();
      })
  })
}  