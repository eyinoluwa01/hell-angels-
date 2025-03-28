const form = document.getElementById('positionApplicationForm');
const confirmationMessage = document.getElementById('confirmationMessage');  // Confirmation message div
const okButton = document.getElementById('okButton');  // Get the "Okay" button

form.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way

    // Get form data (just for debugging purposes)
    const name = document.getElementById('name').value;
    const sex = document.getElementById('sex') ? document.getElementById('sex').value : 'N/A';
    const email = document.getElementById('email').value;
    const country = document.getElementById('country') ? document.getElementById('country').value : 'N/A';
    const position = document.getElementById('position').value;
    const motivation = document.getElementById('motivation').value;

    console.log('Name:', name);
    console.log('Sex', sex);
    console.log('Email:', email);
    console.log('Country:', country);
    console.log('Position:', position);
    console.log('Motivation:', motivation);

    // Display the confirmation message
    confirmationMessage.style.display = 'block';  // Show the confirmation message div
    console.log('Confirmation message displayed');  // Log this for debugging

    // Optionally, reset the form after submission
    form.reset();
});

okButton.addEventListener('click', function() {
    // Redirect to the shop page after clicking "Okay"
    window.location.href = "shop.html";  // Redirect to your shop page
});
