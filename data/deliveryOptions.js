export const deliveryOptions = [{
    id: '1',
    deliverydays: 7,
    cost: 0
},{
    id: '2',
    deliverydays: 3,
    cost: 499
},{
    id: '3',
    deliverydays: 1,
    cost: 999
}];

export function getDeliveryOptions(deliveryOptionId) {
    let deliveryOption;

    if (deliveryOptionId) {
        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
                deliveryOption = option;
            }
        });
    }
    return deliveryOption;
}
