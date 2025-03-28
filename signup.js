// Couples code that needs to be entered correctly
const correctCouplesCode = "MKDIR22"; // Change this to your desired couples code

// Select the form
const form = document.getElementById("joinForm");

// Handle form submission
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission to check the code

    // Get the couples code entered by the user
    const enteredCouplesCode = document.getElementById("couplesCode").value;

    // Check if the couples code is correct
    if (enteredCouplesCode === correctCouplesCode) {
        // Redirect to another page after successful sign up
        alert("Sign up successful!");
        window.location.href = "welcome.html"; // Change this to the page you want to redirect to
    } else {
        alert("Incorrect Couples Code. Sign up failed.");
    }
});
            