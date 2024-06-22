let countdowns = [];

function addCountdown() {
    // Get the input value of the event title
    var inputTitle = document.getElementById("event-title").value;

    // Validate if a date is selected
    if (!inputTitle) {
        alert("Please enter an event title.");
        return;
    }

    // Get the input value of the countdown date
    var inputDate = document.getElementById("countdown-date").value;

    // Validate if a date is selected
    if (!inputDate) {
        alert("Please select a date and time.");
        return;
    }

    // Set the date we're counting down to
    var countDownDate = new Date(inputDate).getTime();

    // Create a countdown object
    let countdown = {
        countDownDate: countDownDate,
        title: inputTitle,
        id: Date.now() // Unique ID for each countdown
    };

    // Add countdown to the array
    countdowns.push(countdown);

    // Render countdowns
    renderCountdowns();

    // Clear input field
    document.getElementById("event-title").value = "";
}

function deleteCountdown(id) {
    // Filter out the countdown with the given id
    countdowns = countdowns.filter(countdown => countdown.id !== id);

    // Render countdowns
    renderCountdowns();
}

function renderCountdowns() {
    // Clear existing countdowns
    document.getElementById("countdown-list").innerHTML = "";

    // Loop through countdowns array and render each countdown
    countdowns.forEach(function(countdown) {
        // Create countdown elements
        let countdownElement = document.createElement("div");
        countdownElement.classList.add("countdown-item");

        // Create flex container for title and countdown display
        let flexContainer = document.createElement("div");
        flexContainer.style.display = "flex";
        flexContainer.style.alignItems = "center";
        flexContainer.style.flexBasis = "80%";

        // Create title span and append it to the flex container
        let titleSpan = document.createElement("span");
        titleSpan.textContent = countdown.title; // Set the text content to the event title
        titleSpan.style.flexBasis = "70%";
        flexContainer.appendChild(titleSpan);

        // Create countdown display element and append it to the flex container
        let countdownDisplay = document.createElement("p");
        countdownDisplay.style.flexBasis = "30%";
        let intervalId = setInterval(function() {
            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countdown.countDownDate - now;

            // Calculate remaining time
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result
            countdownDisplay.innerHTML = days + "d " + hours + "h "
                                          + minutes + "m " + seconds + "s ";

            // If the count down is over, clearInterval and display "EXPIRED"
            if (distance < 0) {
                clearInterval(intervalId);
                countdownDisplay.innerHTML = "EXPIRED";
                deleteCountdown(countdown.id);
            }
        }, 1000);
        
        flexContainer.appendChild(countdownDisplay);

        // Append the flex container to the countdown element
        countdownElement.appendChild(flexContainer);

        // Create delete button and append it to the countdown element
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = function() {
            deleteCountdown(countdown.id);
        };
        countdownElement.appendChild(deleteBtn);

        // Append the countdown element to the countdown list
        document.getElementById("countdown-list").appendChild(countdownElement);
    });
}
