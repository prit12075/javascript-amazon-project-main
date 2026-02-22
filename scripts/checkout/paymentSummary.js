import {cart} from '../../data/cart.js';
import {getProducts} from '../../data/products.js';
import {getDeliveryOptions} from '../../data/deliveryOptions.js';
import {formatPrice} from '../utils/money.js';


export function renderPaymentSummary() {
    let cost = 0;
    let deliveryCost = 0;
    cart.forEach((cartItem) => {
        const product = getProducts(cartItem.productId);
        cost += product.priceCents * cartItem.quantity;
        const deliveryOption = getDeliveryOptions(cartItem.deliveryOption);
        deliveryCost += deliveryOption.cost; 
    });
    console.log(cost);
    console.log(deliveryCost);
    
    const totalBeforeTax = cost + deliveryCost;
    const taxCents = totalBeforeTax * 0.01;

    const totalCost  = totalBeforeTax + taxCents;

    const paymentHTML = `
            <div class="payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatPrice(cost)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatPrice(deliveryCost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatPrice(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatPrice(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatPrice(totalCost)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentHTML;
}


