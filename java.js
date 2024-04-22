// Function to fetch current time from World Time API
function fetchIndianTime() {
    fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata')
        .then(response => response.json())
        .then(data => {
            const dateTime = new Date(data.datetime);
            const hours = dateTime.getHours();
            const minutes = dateTime.getMinutes();
            const seconds = dateTime.getSeconds();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            const twelveHourFormat = hours % 12 || 12; // Convert hours to 12-hour format

            // Format time as HH:MM:SS AM/PM
            const formattedTime = `${twelveHourFormat}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${ampm}`;

            // Format date as Day, Month DD, YYYY
            const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
            const formattedDate = dateTime.toLocaleDateString('en-US', options);

            // Update the date and time on the webpage
            document.getElementById('current-date').textContent = formattedDate;
            document.getElementById('current-time').textContent = formattedTime;
        })
        .catch(error => {
            console.error('Error fetching Indian time:', error);
        });
}

// Update the date and time initially and then refresh every second
document.addEventListener('DOMContentLoaded', () => {
    fetchIndianTime();
    setInterval(fetchIndianTime, 1000); // Update time every 1 second
});
