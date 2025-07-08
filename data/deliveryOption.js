
export function getDeliveryOptionById(deliveryOptionId) {
  let deliveryOption;

    deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId){    // as i want type coercion here, using abstract equality because deliveryOptionId is a s+tring
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0]; // Return the first option if not found

}



export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0,  // Free delivery option
    },
    {
      id: '2',
        deliveryDays: 3,
        priceCents: 100,  
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 199,
    }
]

deliveryOptions.forEach(option => {
  console.log(option.id);
});




