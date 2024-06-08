export let cart = JSON.parse(localStorage.getItem('cart')) || [];

// [
//     {
//         productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//         quantity:1,
//          deliveryOptionsId: '1'
//     },{
//         productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//         quantity:10,
//          deliveryOptionsId: '1'
//     }
// ];
 
export function saveToStorage(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

// 
        // code to add items to cart and save the data to cart.js in data folder via its unique Id
        // 
        let selectQuantity;
        export function addToCart(productId){
            let matchingItem;
        
            cart.forEach((item)=>{
                if(item.productId===productId){
                    matchingItem = item;
                }
            })    
        
            if(matchingItem){
                matchingItem.quantity +=Number(selectQuantity);
            }else{
                cart.push({
                    productId: productId,
                    quantity: Number(selectQuantity),
                    deliveryOptionsId: '1'
                })
            }
           
            saveToStorage()
        }



        export function getSelectvalue(button){
            const productValue= document.querySelector(`.product-quantity-value-${button.dataset.productId}`).value;
            selectQuantity = productValue;
        };    

export function removeCartItem(productId){
    let newArray = [];
    cart.forEach((item)=>{
        if(item.productId !== productId){
            newArray.push(item);
        }
    })
    cart = newArray;

    saveToStorage()
}

export function updateCartQuantity(productId,newQuantity1){
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = Number(newQuantity1);
      }
      
      saveToStorage();
      
    })
  }

  export function updateDeliveryOption(productId,deliveryOptionsId){
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem=cartItem;
        }
    })

    matchingItem.deliveryOptionsId = deliveryOptionsId;
    saveToStorage();
  }