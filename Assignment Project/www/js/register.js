document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Simple validation
    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    // Save user data in localStorage (for demonstration purposes)
    var users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    var existingUser = users.find(function(user) {
        return user.username === username;
    });

    if (existingUser) {
        alert("Username already exists. Please choose another.");
        return;
    }

    // Add new user
    users.push({ username: username, password: password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful. Please login.");
    window.location.href = "login.html";
});
