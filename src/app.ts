import './app'; // Import app.ts logic

import i18next from 'i18next';

export function updateUI() {
    console.log(`Updating UI for language: ${i18next.language}`);
    document.getElementById('title')!.textContent = i18next.t('title');
    document.getElementById('instructions')!.textContent = i18next.t('instructions');
}

export function setupCalendar() {
    console.log('Calendar setup logic goes here.');
}


// Days of the week
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Times for the schedule
const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

// Booked slots for each month and week
const bookedSlots: Record<string, Record<string, string[]>> = {
  January: {
    'Week 1': ['9:00 AM', '10:00 AM'],
    'Week 2': ['1:00 PM'],
    'Week 3': ['3:00 PM'],
    'Week 4': [],
    'Week 5': ['2:00 PM'],
  },
  February: {
    'Week 1': [],
    'Week 2': ['9:00 AM'],
    'Week 3': [],
    'Week 4': ['4:00 PM'],
    'Week 5': ['10:00 AM'],
  },
  // Other months...
};

// Create dropdown for month selection
const monthSelect = document.createElement('select');
// Add instructions for users
const instructions = document.createElement('p');
instructions.textContent = 'Click on the day button to book the time slot';
instructions.style.textAlign = 'center'; // Optional: Center-align the text
instructions.style.margin = '10px 0'; // Optional: Add some spacing

// Event listener for month change
monthSelect.addEventListener('change', updateSchedule);

const monthDays: Record<string, number> = {
  January: 31,
  February: 28, // Leap year handling can be added later
  March: 31,
  April: 30,
  // Other months...
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
months.forEach((month, index) => {
  const option = document.createElement('option');
  option.value = index.toString();
  option.textContent = month;
  monthSelect.appendChild(option);
});

const container = document.getElementById('schedule-container');
container?.appendChild(monthSelect);

// Update the calendar and schedule when the month is changed
function updateSchedule() {
  const selectedMonth = months[parseInt(monthSelect.value)];

  // Clear existing calendar and time slots
  const calendarContainer = document.querySelector('.calendar-container');
  if (calendarContainer) calendarContainer.remove();

  // Create new calendar view
  createCalendarView(selectedMonth);
}

// Create the calendar view based on selected month
function createCalendarView(month: string) {
  const scheduleContainer = document.getElementById('schedule-container') as HTMLElement;
  const calendarContainer = document.createElement('div');
  calendarContainer.classList.add('calendar-container');

  const daysInMonth = monthDays[month];
  
  // Create a table to display the days of the month
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');

  // Create header row for the days of the week
  daysOfWeek.forEach((day: string) => {
    const th = document.createElement('th');
    th.textContent = day;
    headerRow.appendChild(th);
  });
  
  table.appendChild(headerRow);

  // Create rows for each week
  let row;
  let dayOfMonth = 1;
  for (let i = 0; i < 6; i++) { // Maximum 6 rows for a month
    row = document.createElement('tr');
    
    // Populate each cell with the day of the month
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      const dayOfWeek = (dayOfMonth + j - 1) % 7;

      if (dayOfMonth <= daysInMonth) {
        const button = createDayButton(dayOfMonth, month, daysOfWeek[dayOfWeek as number]);
        cell.appendChild(button);
        dayOfMonth++;
      }
      row.appendChild(cell);
    }

    table.appendChild(row);
    if (dayOfMonth > daysInMonth) break;
  }

  calendarContainer.appendChild(table);
  scheduleContainer.appendChild(calendarContainer);
}

// Create button for each day in the calendar
function createDayButton(day: number, month: string, dayOfWeek: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = `${day}`;
  
  button.addEventListener('click', () => {
    displayTimeSlots(day, month);
  });

  return button;
}

// Create a global state to keep track of booked slots
let bookedSlotsState: { [month: string]: { [day: number]: Set<string> } } = {};

// Display available time slots for a selected day
function displayTimeSlots(day: number, month: string) {
  let timeSlotsContainer = document.getElementById('time-slots-container');
  
  // Ensure timeSlotsContainer is properly created if it doesn't exist
  if (!timeSlotsContainer) {
    timeSlotsContainer = document.createElement('div');
    timeSlotsContainer.id = 'time-slots-container';
    document.body.appendChild(timeSlotsContainer);
  }

  // Clear existing time slots before displaying new ones
  if (timeSlotsContainer) {
    timeSlotsContainer.innerHTML = '';  // Clear previous content
  }

  // Get the already booked slots for the selected day
  const availableSlots = bookedSlots[month]?.[day] || [];
  const availableTimes = times.filter(time => !availableSlots.includes(time));

  const slotTable = document.createElement('table');
  const slotHeaderRow = document.createElement('tr');
  const slotHeader = document.createElement('th');
  slotHeader.textContent = `Available Time Slots for ${month} ${day}`;
  slotHeaderRow.appendChild(slotHeader);
  slotTable.appendChild(slotHeaderRow);

  availableTimes.forEach(time => {
    const row = document.createElement('tr');
    const timeCell = document.createElement('td');
    timeCell.textContent = time;
    row.appendChild(timeCell);

    const bookButtonCell = document.createElement('td');
    const bookButton = document.createElement('button');
    bookButton.textContent = 'Book';
    bookButton.addEventListener('click', () => handleBooking(day, month, time, bookButton));
    bookButtonCell.appendChild(bookButton);
    row.appendChild(bookButtonCell);

    slotTable.appendChild(row);
  });

  // Append the table with available times to the container
  if (timeSlotsContainer) {
    timeSlotsContainer.appendChild(slotTable);
  }
}

// Handle the booking action when a button is clicked
function handleBooking(day: number, month: string, time: string, button: HTMLButtonElement) {
  // Check if the slot is already booked
  if (!bookedSlotsState[month]) bookedSlotsState[month] = {};
  if (!bookedSlotsState[month][day]) bookedSlotsState[month][day] = new Set();

  // Mark the slot as booked by adding it to the set
  bookedSlotsState[month][day].add(time);

  // Update the button text and disable it
  button.textContent = 'Booked';
  button.disabled = true;
  button.style.backgroundColor = 'red';
}

// Initial load
createCalendarView('January');
