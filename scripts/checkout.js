import {cart, removefromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatPrice} from './utils/money.js';

let checkoutHTML =  '';

cart.forEach((cartItem) => {
    const productID = cartItem.productId;

    let mathchingproduct;

    products.forEach((product) => {
        if (product.id === productID) {
            mathchingproduct = product;
        }
    });
    
    checkoutHTML += `
    
    <div class="cart-item-container 
    js-cart-item-${mathchingproduct.id}">
        <div class="delivery-date">
            Delivery date: Wednesday, June 15
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
        src="${mathchingproduct.image}">

            <div class="cart-item-details">
                <div class="product-name">
                    ${mathchingproduct.name}
                </div>
                <div class="product-price">
                    ${formatPrice(mathchingproduct.priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-qty" data-product-id="${mathchingproduct.id}">
                Delete
                </span>
                </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>

            <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
            name="${productID}">
            <div>
            <div class="delivery-option-date">
                Tuesday, June 21
            </div>
            <div class="delivery-option-price">
                FREE Shipping
            </div>
            </div>
        </div>
            <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input"
            name="${productID}">
            <div>
            <div class="delivery-option-date">
                Wednesday, June 15
            </div>
            <div class="delivery-option-price">
                $4.99 - Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
            name="${productID}">
            <div>
            <div class="delivery-option-date">
                Monday, June 13
            </div>
            <div class="delivery-option-price">
                $9.99 - Shipping
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>`;
});
document.querySelector('.js-order-summary').innerHTML = checkoutHTML;    

document.querySelectorAll('.js-delete-qty').forEach((link) => {
    link.addEventListener('click', () => {
        const id = link.dataset.productId;
        removefromCart(id);
        const container = document.querySelector(`.js-cart-item-${id}`);
        if(container) {
            container.remove();
        }
        console.log(container);
    });
});
