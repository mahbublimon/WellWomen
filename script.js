document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".question");
        const answer = item.querySelector(".answer");

        if (question && answer) {
            question.addEventListener("click", () => {
                // Toggle answer visibility
                answer.style.display = answer.style.display === "block" ? "none" : "block";
            });
        }
    });
});

let currentStory = 0;
const stories = document.querySelectorAll(".story-card");

function showStory(index) {
    stories.forEach((story, i) => {
        story.style.opacity = i === index ? "1" : "0";
    });
}

function prevStory() {
    currentStory = (currentStory > 0) ? currentStory - 1 : stories.length - 1;
    showStory(currentStory);
}

function nextStory() {
    currentStory = (currentStory < stories.length - 1) ? currentStory + 1 : 0;
    showStory(currentStory);
}

// Initialize the first story
showStory(currentStory);

function calculateOvulation() {
    const lastPeriod = new Date(document.getElementById('last-period').value);
    const cycleLength = parseInt(document.getElementById('cycle-length').value, 10);

    if (isNaN(lastPeriod.getTime()) || !cycleLength) {
        document.getElementById('result').innerText = "Please fill in all fields.";
        return;
    }

    const ovulationDate = new Date(lastPeriod);
    ovulationDate.setDate(lastPeriod.getDate() + (cycleLength - 14));

    document.getElementById('result').innerText = 
        `Your estimated ovulation date is: ${ovulationDate.toDateString()}`;
}

function calculateHCG() {
    const level1 = parseFloat(document.getElementById('hcg-level-1').value);
    const level2 = parseFloat(document.getElementById('hcg-level-2').value);
    const hours = parseFloat(document.getElementById('time-difference').value);

    if (isNaN(level1) || isNaN(level2) || isNaN(hours)) {
        document.getElementById('result').innerText = "Please fill in all fields.";
        return;
    }

    const rate = (level2 / level1 - 1) * (100 / hours);
    document.getElementById('result').innerText = 
        `Your hCG doubling rate is approximately ${rate.toFixed(2)}% per hour.`;
}

function calculateTestTiming() {
    const lastPeriod = new Date(document.getElementById('last-period').value);

    if (isNaN(lastPeriod.getTime())) {
        document.getElementById('result').innerText = "Please provide a valid date.";
        return;
    }

    const testDate = new Date(lastPeriod);
    testDate.setDate(lastPeriod.getDate() + 14);

    document.getElementById('result').innerText = 
        `You can take a pregnancy test from: ${testDate.toDateString()}`;
}

function calculateNextPeriod() {
    const lastPeriodStart = new Date(document.getElementById('last-period').value);
    const periodDuration = parseInt(document.getElementById('period-duration').value);
    const cycleLength = parseInt(document.getElementById('cycle-length').value);

    if (isNaN(lastPeriodStart.getTime()) || isNaN(periodDuration) || isNaN(cycleLength)) {
        document.getElementById('result').innerText = "Please provide valid inputs.";
        return;
    }

    // Calculate next period start date
    const nextPeriodStart = new Date(lastPeriodStart);
    nextPeriodStart.setDate(lastPeriodStart.getDate() + cycleLength);

    // Calculate next period end date
    const nextPeriodEnd = new Date(nextPeriodStart);
    nextPeriodEnd.setDate(nextPeriodStart.getDate() + periodDuration);

    document.getElementById('result').innerText = 
        `Your next period is estimated to start on: ${nextPeriodStart.toDateString()} 
        and end on: ${nextPeriodEnd.toDateString()}`;
}

function calculateImplantation() {
    const ovulationDate = new Date(document.getElementById('ovulation-date').value);

    if (isNaN(ovulationDate.getTime())) {
        document.getElementById('result').innerText = "Please provide a valid date.";
        return;
    }

    const implantationStart = new Date(ovulationDate);
    implantationStart.setDate(ovulationDate.getDate() + 6);

    const implantationEnd = new Date(ovulationDate);
    implantationEnd.setDate(ovulationDate.getDate() + 12);

    document.getElementById('result').innerText = 
        `Implantation is likely to occur between: ${implantationStart.toDateString()} and ${implantationEnd.toDateString()}`;
}

function calculateDueDate() {
    const lastPeriod = new Date(document.getElementById('last-period').value);

    if (isNaN(lastPeriod.getTime())) {
        document.getElementById('result').innerText = "Please provide a valid date.";
        return;
    }

    const dueDate = new Date(lastPeriod);
    dueDate.setDate(lastPeriod.getDate() + 280); // 40 weeks or 280 days

    document.getElementById('result').innerText = 
        `Your estimated due date is: ${dueDate.toDateString()}`;
}

function calculateIVFDueDate() {
    const transferDate = new Date(document.getElementById('transfer-date').value);
    const embryoType = parseInt(document.getElementById('embryo-type').value);

    if (isNaN(transferDate.getTime()) || isNaN(embryoType)) {
        document.getElementById('result').innerText = "Please provide valid inputs.";
        return;
    }

    // IVF Due Date Calculation: Transfer date + (280 - embryo age)
    const dueDate = new Date(transferDate);
    dueDate.setDate(transferDate.getDate() + (280 - embryoType));

    document.getElementById('result').innerText = 
        `Your estimated due date is: ${dueDate.toDateString()}`;
}

function calculateUltrasoundDueDate() {
    const ultrasoundDate = new Date(document.getElementById('ultrasound-date').value);
    const gestationalAge = parseInt(document.getElementById('gestational-age').value);

    if (isNaN(ultrasoundDate.getTime()) || isNaN(gestationalAge)) {
        document.getElementById('result').innerText = "Please provide valid inputs.";
        return;
    }

    // Calculate the due date by adding (280 - gestationalAgeInDays) to the ultrasound date.
    const dueDate = new Date(ultrasoundDate);
    const gestationalAgeInDays = gestationalAge * 7;  // Convert weeks to days
    dueDate.setDate(ultrasoundDate.getDate() + (280 - gestationalAgeInDays));

    document.getElementById('result').innerText = 
        `Your estimated due date is: ${dueDate.toDateString()}`;
}

const monthlyPrices = [0, 9.99, 19.99, 39.99, 69.99, 149.99]; // Monthly prices in USD
const annualPrices = monthlyPrices.map(price => (price * 12 * 0.84).toFixed(2)); // 16% discount for annual prices

function togglePricing() {
    const isAnnual = document.getElementById("toggle-pricing").checked;

    const currency = navigator.language === 'bn-BD' || navigator.language === 'bd' ? 'BDT' : 'USD';
    const conversionRate = currency === 'BDT' ? 85 : 1;

    const priceElements = [
        document.getElementById("price1"),
        document.getElementById("price2"),
        document.getElementById("price3"),
        document.getElementById("price4"),
        document.getElementById("price5"),
        document.getElementById("price6")
    ];

    priceElements.forEach((el, index) => {
        const price = isAnnual ? annualPrices[index] : monthlyPrices[index];
        const convertedPrice = (price * conversionRate).toFixed(2);

        if (index === 0) {
            el.textContent = "Free";
        } else {
            el.textContent = `${convertedPrice} ${currency} / ${isAnnual ? "year" : "month"}`;
        }
    });
}

function subscribe(plan) {
    alert(`Redirecting to payment gateway for the ${plan} plan.`);
}

// Password Visibility Toggle
function togglePassword(fieldId) {
    var passwordField = document.getElementById(fieldId);
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");
    const sendMessageButton = document.getElementById("send-message");
    const typingIndicator = document.getElementById("typing-indicator");
    const usernameDisplay = document.getElementById("username-display");
    const onlineUsersDisplay = document.getElementById("online-users");

    let username = localStorage.getItem("communityUsername");
    let typingTimeout;

    // Generate a random username if not already assigned
    if (!username) {
        username = `User_${Math.floor(Math.random() * 10000)}`;
        localStorage.setItem("communityUsername", username);
    }

    usernameDisplay.textContent = username;

    // Simulate online users count (can be replaced with a server call)
    const onlineUsers = Math.floor(Math.random() * 50) + 1;
    onlineUsersDisplay.textContent = onlineUsers;

    // Event Listener: Message Input (Typing Indicator)
    messageInput.addEventListener("input", () => {
        clearTimeout(typingTimeout);
        showTypingIndicator();

        // Hide the indicator after 2 seconds of inactivity
        typingTimeout = setTimeout(hideTypingIndicator, 2000);
    });

    // Send Message Functionality
    sendMessageButton.addEventListener("click", () => {
        const message = messageInput.value.trim();
        if (message !== "") {
            appendMessage(username, message);
            messageInput.value = "";
        }
    });

    // Append Message to Chat
    function appendMessage(user, message) {
        const messageElement = document.createElement("p");
        messageElement.innerHTML = `<strong>${user}:</strong> ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
    }

    // Show Typing Indicator
    function showTypingIndicator() {
        typingIndicator.style.display = "block";
    }

    // Hide Typing Indicator
    function hideTypingIndicator() {
        typingIndicator.style.display = "none";
    }
});