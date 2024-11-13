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