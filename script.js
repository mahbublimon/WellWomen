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
