// server.js (Node.js Backend)
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

const sendConfirmationEmail = (email, orderDetails) => {
    const message = {
        to: email,
        from: 'hellsangelbrotherhood301@gmail.com.com', // Your email address
        subject: 'Order Confirmation - Hells Angels Shop',
        text: `Thank you for your order! Here's the summary:

Order Details:
${orderDetails}

We appreciate your business and hope you enjoy your purchase!

Best regards,
Hells Angels Shop`,
    };

    sgMail.send(message)
        .then(response => {
            console.log('Email sent successfully');
        })
        .catch(error => {
            console.error('Error sending email:', error);
        });
};

// Example of how you'd call this function when an order is placed:
sendConfirmationEmail('customer@example.com', 'Product: Hells Angels T-Shirt\nQuantity: 1\nPrice: $50.00\nTotal: $50.00');

// Express.js Route to Handle Email Sending
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Set up middleware
app.use(bodyParser.json());

// POST route for sending confirmation emails
app.post('/send-confirmation-email', (req, res) => {
    const { email, orderDetails } = req.body;

    sendConfirmationEmail(email, orderDetails);
    
    res.json({ message: 'Order confirmation sent to email' });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
