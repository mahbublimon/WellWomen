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