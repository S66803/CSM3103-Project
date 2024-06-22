document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Retrieve users from localStorage
    var users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username and password match
    var loggedInUser = users.find(function(user) {
        return user.username === username && user.password === password;
    });

    if (loggedInUser) {
        alert("Login successful.");
        localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
        window.location.href = "countdown.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
});
