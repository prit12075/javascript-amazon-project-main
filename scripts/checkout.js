import {cart, removefromCart, updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatPrice} from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {deliveryOptions} from '../data/deliveryOptions.js';

const today = dayjs();
const deliverydate = today.add(7,'days')
console.log(deliverydate.format('dddd, MMMM D'));

function renderOrderSummary() {
    let checkoutHTML =  '';

    cart.forEach((cartItem) => {
        const productID = cartItem.productId;

        let mathchingproduct;

        products.forEach((product) => {
            if (product.id === productID) {
                mathchingproduct = product;
            }
        });

        let deliveryOption;

        deliveryOptions.forEach((option) => {
            if (option.id === cartItem.deliveryOption) {
                deliveryOption = option;
            }
        });

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliverydays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
    
        checkoutHTML += `
        
        <div class="cart-item-container 
        js-cart-item-${mathchingproduct.id}">
            <div class="delivery-date js-delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
            src="${mathchingproduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${mathchingproduct.name}
                    </div>
                    <div class="product-price">
                        $${formatPrice(mathchingproduct.priceCents)}
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
                    ${deliveryOptionsHTML(cartItem)}
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

    document.querySelectorAll('.js-delivery-option') 
    .forEach((radio) => {
        radio.addEventListener('click', () => {
            const {productId, deliveryOption} = radio.dataset;
            updateDeliveryOption(productId, deliveryOption);
            renderOrderSummary();
        })
    });
}

export function deliveryOptionsHTML(cartItem){

    let html = '';

    deliveryOptions.forEach((deliveryOption) => {

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliverydays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.cost === 0 
        ? 'FREE Shipping' 
        : `$${formatPrice(deliveryOption.cost)} - Shipping`;

        const isChecked = deliveryOption.id === cartItem.deliveryOption;

        html += `
                <div class="delivery-option"
                data-product-id="${cartItem.productId}"
                data-delivery-option="${deliveryOption.id}">
                    <input type="radio" class="delivery-option-input js-delivery-option"
                        name="delivery-option-${cartItem.productId}"
                        value="${deliveryOption.id}"
                        data-product-id="${cartItem.productId}"
                        data-delivery-option="${deliveryOption.id}"
                        ${isChecked ? 'checked' : ''}>
                    <div>
                        <div class="delivery-option-date">
                            ${dateString} 
                        </div>
                        <div class="delivery-option-price">
                            ${priceString}
                        </div>
                    </div>
                </div>
        `
    });
    
    return html;
}

renderOrderSummary();
