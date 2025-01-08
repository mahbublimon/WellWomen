// Load external navbar and footer
document.addEventListener("DOMContentLoaded", () => {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
    // FAQ toggle functionality
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

    // Story Card Navigation
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

    // Ovulation Date Calculator
    function calculateOvulation() {
        const lastPeriod = new Date(document.getElementById('last-period').value);
        const cycleLength = parseInt(document.getElementById('cycle-length').value, 10);

        if (isNaN(lastPeriod.getTime()) || isNaN(cycleLength)) {
            document.getElementById('result').innerText = "Please fill in all fields.";
            return;
        }

        const ovulationDate = new Date(lastPeriod);
        ovulationDate.setDate(lastPeriod.getDate() + (cycleLength - 14));

        document.getElementById('result').innerText = 
            `Your estimated ovulation date is: ${ovulationDate.toDateString()}`;
    }

    // HCG Doubling Rate Calculator
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

    // Pregnancy Test Timing Calculator
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

    // Next Period Calculator
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

    // Implantation Window Calculator
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
    
    //Due Date Calculator
    function calculateDueDate() {
        const lastPeriodDate = document.getElementById("last-period").value;
        if (!lastPeriodDate) {
            document.getElementById("result").innerHTML = `<span class="text-danger">Please enter a valid date.</span>`;
            return;
        }
        const lastPeriod = new Date(lastPeriodDate);
        const dueDate = new Date(lastPeriod);
        dueDate.setDate(dueDate.getDate() + 280);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const formattedDueDate = dueDate.toLocaleDateString(undefined, options);
        document.getElementById("result").innerHTML =
            `<span class="text-success">Your estimated due date is: ${formattedDueDate}</span>`;
    }  

    // IVF Due Date Calculator
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

    // Ultrasound Due Date Calculator
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

    document.getElementById('toggle-pricing').addEventListener('change', function () {
        const isAnnual = this.checked;
        const priceMapping = {
            1: isAnnual ? "BDT 1188" : "BDT 99",
            2: isAnnual ? "BDT 2388" : "BDT 199",
            3: isAnnual ? "BDT 3588" : "BDT 299",
            4: isAnnual ? "BDT 5988" : "BDT 499",
            5: isAnnual ? "BDT 9588" : "BDT 799",
            6: isAnnual ? "BDT 11988" : "BDT 999",
            7: isAnnual ? "BDT 14388" : "BDT 1199",
            8: isAnnual ? "BDT 16788" : "BDT 1399",
            9: isAnnual ? "BDT 17988" : "BDT 1499"
        };
    
        for (let i = 1; i <= 9; i++) {
            document.getElementById(`price${i}`).textContent = priceMapping[i];
        }
    });
    
    function subscribe(plan) {
        alert(`You have selected the ${plan} plan.`);
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

    // Chat functionality
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

    // Function to fetch articles dynamically and render them
function fetchArticles(apiEndpoint, containerId) {
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById(containerId);
            container.innerHTML = data.slice(0, 3).map(article => `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${article.image || 'placeholder.jpg'}" class="card-img-top" alt="${article.title}">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.summary}</p>
                            <button class="btn btn-primary" onclick="viewArticle('${article.id}')">Read More</button>
                        </div>
                    </div>
                </div>
            `).join('');
        })
        .catch(err => console.error(`Error fetching articles from ${apiEndpoint}:`, err));
}

// Function to view article details (placeholder)
function viewArticle(articleId) {
    alert(`Viewing article ${articleId}`);
}

// Load articles on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchArticles('/api/pregnancy', 'pregnancy-articles');
    fetchArticles('/api/health', 'health-articles');
    fetchArticles('/api/birth', 'birth-articles');
});
// Fetch articles from the APIs and populate rows
async function fetchArticles(apiUrl, containerId) {
    try {
        const response = await fetch(apiUrl);
        const articles = await response.json();

        const container = document.getElementById(containerId);
        container.innerHTML = articles.map(article => `
            <div class="col-md-4">
                <div class="card">
                    <img src="${article.image}" alt="${article.title} Image" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <button class="btn btn-outline-primary" onclick="showArticle('${article.title}', '${article.content}')">Read More</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
}

// Show article content in a modal
function showArticle(title, content) {
    const modalTitle = document.getElementById('articleModalLabel');
    const modalContent = document.getElementById('articleModalContent');
    modalTitle.textContent = title;
    modalContent.innerHTML = content;
    const modal = new bootstrap.Modal(document.getElementById('articleModal'));
    modal.show();
}

// Load articles on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchArticles('api/health.js', 'health-articles');
    fetchArticles('api/birth.js', 'birth-articles');
    fetchArticles('api/pregnancy.js', 'pregnancy-articles');
});

function togglePassword(id) {
    const passwordField = document.getElementById(id);
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
}

// Handle the signup form submission
document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();  // Prevent form submission

    fetch("/signup", {
        method: "POST",
        body: new FormData(this),
    })
        .then((response) => {
            if (response.ok) {
                // Hide signup form and show OTP form with a message
                document.getElementById("signupFormContainer").style.display = "none";
                document.getElementById("otpFormContainer").style.display = "block";
            } else {
                alert("Error signing up. Please try again.");
            }
        })
        .catch((error) => console.error("Error:", error));
});

document.getElementById("otpForm").addEventListener("submit", function (e) {
    e.preventDefault();  // Prevent form submission

    fetch("/verify-otp", {
        method: "POST",
        body: new FormData(this),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Redirect to login page upon successful OTP verification
                window.location.href = "login.html";
            } else {
                alert("Invalid OTP. Please try again.");
            }
        })
        .catch((error) => console.error("Error:", error));
});