// Array to store cart items
let cart = [];

// Function to add a product to the cart
function addToCart(productName, productPrice) {
    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        // If the product is already in the cart, increment the quantity
        existingProduct.quantity++;
    } else {
        // If the product is not in the cart, add it with quantity 1
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCartDisplay();
    showItemAddedNotification(productName);
}

// Function to update the cart display (basket count and modal)
function updateCartDisplay() {
    // Update cart count in the shopping basket
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;

    // Update the cart total and items in the modal
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = ''; // Clear current cart items

    // Populate cart items list in the modal
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItemsList.appendChild(listItem);
    });
}

// Function to show the cart modal
function showCart() {
    document.getElementById('cart-modal').style.display = 'block';
}

// Function to close the cart modal
function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Function to handle the checkout process
function checkout() {
    const paymentMethod = document.getElementById('payment-method').value;
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to the cart before checking out.');
        return;
    }

    // Gift card handling (check if Gift Card was selected)
    if (paymentMethod === 'Gift Card') {
        const giftCardFile = document.getElementById('gift-card-file').files[0];
        if (!giftCardFile) {
            alert('Please upload your gift card image.');
            return;
        }

        // Handle gift card file upload
        const formData = new FormData();
        formData.append('gift-card', giftCardFile);

        fetch('/process-gift-card', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Gift card uploaded successfully!');
            proceedWithCheckout(paymentMethod);
        })
        .catch(error => {
            console.error('Error uploading gift card:', error);
        });
    } else {
        proceedWithCheckout(paymentMethod);
    }
}

// Helper function to complete the checkout
function proceedWithCheckout(paymentMethod) {
    alert(`Checkout successful! You paid using ${paymentMethod}.`);
    // Reset the cart after successful checkout
    cart = [];
    updateCartDisplay();
    closeCart();
}

// Function to show the item added notification
function showItemAddedNotification(productName) {
    const notification = document.getElementById('item-added-notification');
    notification.textContent = `${productName} added to the cart.`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// Handle "Add to Cart" button clicks
document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.previousElementSibling.previousElementSibling.textContent; // Get product name
        const productPrice = parseFloat(this.previousElementSibling.textContent.replace('$', '')); // Get product price
        addToCart(productName, productPrice);
    });
});

// Handle payment method change (for showing the gift card upload field)
function handlePaymentChange() {
    const paymentMethod = document.getElementById('payment-method').value;
    const giftCardUpload = document.getElementById('gift-card-upload');

    if (paymentMethod === 'Gift Card') {
        giftCardUpload.style.display = 'block'; // Show gift card upload
    } else {
        giftCardUpload.style.display = 'none'; // Hide gift card upload
    }
}

// Event listener to handle the payment method change
document.getElementById('payment-method').addEventListener('change', handlePaymentChange);


// Function to handle the checkout process
function checkout() {
    const paymentMethod = document.getElementById('payment-method').value;
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to the cart before checking out.');
        return;
    }
    
    const userEmail = prompt('Enter your email for the receipt:');
    if (!userEmail) {
        alert('Please enter a valid email.');
        return;
    }

    // Prepare order details as a string to send in the email
    let orderDetails = `Payment Method: ${paymentMethod}\n\n`;
    cart.forEach(item => {
        orderDetails += `Product: ${item.name}\nQuantity: ${item.quantity}\nPrice: $${item.price}\nTotal: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });

    // Total price
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    orderDetails += `Total: $${totalPrice.toFixed(2)}\n`;

    // Send the order details to the backend to send an email
    fetch('/send-confirmation-email', {  // Assuming '/send-confirmation-email' is your endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: userEmail,
            orderDetails: orderDetails,
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Your order has been confirmed! Check your email for the receipt.');
        cart = [];  // Reset the cart after successful checkout
        updateCartDisplay();
        closeCart();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error processing your order. Please try again later.');
    });
}
