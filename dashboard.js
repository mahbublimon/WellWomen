document.addEventListener('DOMContentLoaded', () => {
    // Fetch user data from the server
    fetch('/user-profile')
        .then(response => response.json())
        .then(data => {
            document.getElementById('weight').textContent = `${data.weight} kg`;
            document.getElementById('bmi').textContent = data.bmi;
            document.getElementById('lastPeriod').textContent = data.lastPeriod;
            document.getElementById('subscription').textContent = data.subscription
                ? `${data.subscription.type} (Valid Until: ${data.subscription.validUntil})`
                : 'No Subscription';
            document.getElementById('paymentMethod').textContent = data.subscription
                ? data.subscription.paymentMethod
                : 'No Payment Method';
        })
        .catch(error => console.error('Error fetching user profile:', error));
});