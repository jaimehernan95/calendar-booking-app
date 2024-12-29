"use strict";
// In app.ts
const schedule = [
    { day: 'Monday', time: '9:00 AM - 10:00 AM', booked: false },
    { day: 'Monday', time: '10:00 AM - 11:00 AM', booked: false },
    { day: 'Monday', time: '11:00 AM - 12:00 PM', booked: false },
    { day: 'Tuesday', time: '9:00 AM - 10:00 AM', booked: false },
    { day: 'Wednesday', time: '9:00 AM - 1:00 PM', booked: true }, // Already fully booked
    { day: 'Thursday', time: '9:00 AM - 10:00 AM', booked: false },
    { day: 'Friday', time: '9:00 AM - 10:00 AM', booked: false }
];
const generateSchedule = () => {
    const tableBody = document.querySelector('#schedule tbody');
    schedule.forEach((entry) => {
        const row = document.createElement('tr');
        const dayCell = document.createElement('td');
        dayCell.textContent = entry.day;
        row.appendChild(dayCell);
        const timeCell = document.createElement('td');
        timeCell.textContent = entry.time;
        if (entry.booked) {
            timeCell.style.color = 'red'; // Highlight booked times
            timeCell.textContent += ' - Booked';
        }
        else {
            // Add a clickable button to allow booking
            const bookButton = document.createElement('button');
            bookButton.textContent = 'Book';
            bookButton.onclick = () => bookTime(entry);
            timeCell.appendChild(bookButton);
        }
        row.appendChild(timeCell);
        tableBody.appendChild(row);
    });
};
const bookTime = (entry) => {
    // Handle booking logic (e.g., mark as booked, update UI)
    entry.booked = true;
    alert(`You have booked ${entry.day} from ${entry.time}`);
    generateSchedule(); // Regenerate the table to reflect the booking
};
// Call the function to generate the schedule when the page loads
window.onload = generateSchedule;
