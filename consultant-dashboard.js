document.addEventListener('DOMContentLoaded', () => {
    const requestsList = document.getElementById('requests-list');

    // Sample data of consultation requests
    const requests = [
        { id: 1, patientName: 'Alice Johnson', consultant: 'Dr. Jane Doe', requestedAt: '2025-01-09 10:00 AM', status: 'pending' },
        { id: 2, patientName: 'Bob Smith', consultant: 'Dr. John Smith', requestedAt: '2025-01-09 11:00 AM', status: 'pending' },
        { id: 3, patientName: 'Charlie Brown', consultant: 'Dr. Emily Zhao', requestedAt: '2025-01-09 12:00 PM', status: 'pending' }
    ];

    // Render incoming consultation requests
    const renderRequests = () => {
        requestsList.innerHTML = ''; // Clear any existing requests
        requests.forEach(request => {
            const requestItem = document.createElement('div');
            requestItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

            // Request info
            requestItem.innerHTML = `
                <strong>Patient:</strong> ${request.patientName} <br>
                <small><em>Requested At: ${request.requestedAt}</em></small>
            `;

            // Action buttons
            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('btn-group', 'btn-group-sm');

            // Accept button
            const acceptButton = document.createElement('button');
            acceptButton.classList.add('btn', 'btn-success');
            acceptButton.textContent = 'Accept';
            acceptButton.addEventListener('click', () => joinConference(request.id));

            // Decline button
            const declineButton = document.createElement('button');
            declineButton.classList.add('btn', 'btn-danger');
            declineButton.textContent = 'Decline';
            declineButton.addEventListener('click', () => declineRequest(request.id));

            buttonsDiv.appendChild(acceptButton);
            buttonsDiv.appendChild(declineButton);

            requestItem.appendChild(buttonsDiv);
            requestsList.appendChild(requestItem);
        });
    };

    // Handle "Accept" button click to join the conference
    const joinConference = (requestId) => {
        const request = requests.find(req => req.id === requestId);
        alert(`You are joining the conference with ${request.patientName}.`);

        // Redirect to the conference page (this can be improved with dynamic meeting IDs)
        window.location.href = `conference.html?consultant=${request.consultant}&patient=${request.patientName}&meetingId=${requestId}`;
    };

    // Handle "Decline" button click to decline the consultation request
    const declineRequest = (requestId) => {
        const request = requests.find(req => req.id === requestId);
        alert(`You have declined the consultation with ${request.patientName}.`);

        // Here you could send an API request to decline the consultation if backend is used.
        requests.splice(requests.findIndex(req => req.id === requestId), 1); // Remove the declined request from the list
        renderRequests(); // Re-render the request list
    };

    // Initial render of requests
    renderRequests();
});