document.getElementById('getstatus').addEventListener('click', () => {
    const trainNumber = document.getElementById('trainNumber').value;

    if (trainNumber.trim() === "") {
        alert("Please enter a train number.");
        return;
    }

    const apiUrl = `YOUR_RAPIDAPI_ENDPOINT?trainno=${trainNumber}`; // Replace with your actual RapidAPI endpoint
    const apiKey = 'YOUR_RAPIDAPI_KEY'; // Replace with your RapidAPI key

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'YOUR_RAPIDAPI_HOST' // Replace with your RapidAPI host
        }
    })
    .then(response => {
        if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Process the data and display it in the result div
        console.log(data); // Check the structure of the data in the console

        let resultHtml = "";
        if (data && data.length > 0) { // Example: check if data is an array and not empty
           // Adapt this to how your API returns the data.
            data.forEach(train => {
                resultHtml += `<p><strong>Train No:</strong> ${train.number}</p>`;
                resultHtml += `<p><strong>Current Status:</strong> ${train.status}</p>`; // Example, adjust as needed.
                // ... add other details you want to display
            });
        } else {
            resultHtml = "<p>No data found or invalid train number.</p>";
        }
        document.getElementById('result').innerHTML = resultHtml;

    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('result').innerHTML = "<p>Error fetching train status. Please check the train number and try again.</p>";
    });
});
