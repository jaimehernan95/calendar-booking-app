"use strict";
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
const bookedSlots = { Wednesday: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'] };
const scheduleContainer = document.getElementById('schedule-container');
function createButton(day, time) {
    var _a, _b, _c;
    const button = document.createElement('button');
    button.textContent = ((_a = bookedSlots[day]) === null || _a === void 0 ? void 0 : _a.includes(time)) ? 'Booked' : 'Book';
    button.disabled = (_c = (_b = bookedSlots[day]) === null || _b === void 0 ? void 0 : _b.includes(time)) !== null && _c !== void 0 ? _c : false;
    button.addEventListener('click', () => {
        button.textContent = 'Booked';
        button.disabled = true;
        if (!bookedSlots[day])
            bookedSlots[day] = [];
        bookedSlots[day].push(time);
    });
    return button;
}
function createScheduleTable() {
    if (!scheduleContainer) {
        console.error('Error: schedule-container element not found.');
        return;
    }
    const table = document.createElement('table');
    table.classList.add('schedule-table');
    // Create header row
    const headerRow = document.createElement('tr');
    const emptyHeader = document.createElement('th');
    headerRow.appendChild(emptyHeader); // Empty top-left cell
    days.forEach((day) => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    // Create rows for each time
    times.forEach((time) => {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        timeCell.textContent = time;
        row.appendChild(timeCell);
        days.forEach((day) => {
            const cell = document.createElement('td');
            const button = createButton(day, time);
            cell.appendChild(button);
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
    scheduleContainer.appendChild(table);
}
createScheduleTable();
