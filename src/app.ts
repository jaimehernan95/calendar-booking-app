import i18next from 'i18next';

// Update the UI text and refresh the calendar
export function updateUI() {
  console.log(`Updating UI for language: ${i18next.language}`);
  document.getElementById('title')!.textContent = i18next.t('title');
  document.getElementById('instructions')!.textContent = i18next.t('instructions');
  updateSchedule();
}

// Set up the initial calendar (using English internal keys)
export function setupCalendar() {
  console.log('Setting up calendar...');
  // Use the English month name (from the constant array) for internal logic
  const currentMonthIndex = new Date().getMonth();
  const currentMonth = months[currentMonthIndex];
  createCalendarView(currentMonth);
}

// Retrieve translated arrays from i18next
function getTranslatedDaysOfWeek(): string[] {
  return i18next.t('daysOfWeek', { returnObjects: true }) as string[];
}
function getTranslatedTimes(): string[] {
  return i18next.t('times', { returnObjects: true }) as string[];
}

// For display purposes you might also translate the month names:
// (Assumes your locales include a "months" array.)
function getTranslatedMonths(): string[] {
  return i18next.t('months', { returnObjects: true }) as string[];
}

// Use a fixed internal array of months (keys must match monthDays keys)
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthDays: Record<string, number> = {
  January: 31, February: 28, March: 31, April: 30, May: 31, June: 30,
  July: 31, August: 31, September: 30, October: 31, November: 30, December: 31
};

// Keeps track of booked slots
const bookedSlots: Record<string, Record<number, string[]>> = {};

// Create the month dropdown for selecting the month.
const monthSelect = document.createElement('select');
monthSelect.addEventListener('change', updateSchedule);
months.forEach((month, index) => {
  const option = document.createElement('option');
  option.value = index.toString();
  // You can optionally use the translated month names here:
  // const translatedMonths = getTranslatedMonths();
  // option.textContent = translatedMonths[index];
  option.textContent = month;
  monthSelect.appendChild(option);
});
document.getElementById('schedule-container')?.appendChild(monthSelect);

// Update the calendar when language or month selection changes.
function updateSchedule() {
  console.log('Updating schedule...');

  // Remove any existing calendar(s)
  const existingCalendars = document.querySelectorAll('.calendar-container');
  existingCalendars.forEach(calendar => calendar.remove());

  // Use the fixed English month (internal key) to lookup days
  let selectedMonth: string;
  if (monthSelect.value !== '') {
    const monthIndex = parseInt(monthSelect.value);
    selectedMonth = months[monthIndex];
  } else {
    // Fallback: use current month based on English keys
    const currentMonthIndex = new Date().getMonth();
    selectedMonth = months[currentMonthIndex];
  }

  // (Optional) Log the current selected language:
  console.log("Selected language:", getSelectedLanguage());

  // Recreate the calendar using the internal English month name
  createCalendarView(selectedMonth);
}

// Create the calendar view based on the internal month name
function createCalendarView(month: string) {
  const scheduleContainer = document.getElementById('schedule-container') as HTMLElement;
  const calendarContainer = document.createElement('div');
  calendarContainer.classList.add('calendar-container');

  // Create table for the calendar
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  // Use translated days of the week for the header
  getTranslatedDaysOfWeek().forEach(day => {
    const th = document.createElement('th');
    th.textContent = day;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  let dayOfMonth = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (dayOfMonth <= monthDays[month]) {
        const button = createDayButton(dayOfMonth, month);
        cell.appendChild(button);
        dayOfMonth++;
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
    if (dayOfMonth > monthDays[month]) break;
  }
  calendarContainer.appendChild(table);
  scheduleContainer.appendChild(calendarContainer);
}

// Create a button for each day that shows the day number and triggers the time slots display
function createDayButton(day: number, month: string): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = `${day}`;
  button.addEventListener('click', () => displayTimeSlots(day, month));
  return button;
}

// Display the available time slots for a given day and month
function displayTimeSlots(day: number, month: string) {
  let timeSlotsContainer = document.getElementById('time-slots-container');
  if (!timeSlotsContainer) {
    timeSlotsContainer = document.createElement('div');
    timeSlotsContainer.id = 'time-slots-container';
    document.body.appendChild(timeSlotsContainer);
  }
  timeSlotsContainer.innerHTML = '';

  const availableSlots = bookedSlots[month]?.[day] || [];
  const availableTimes = getTranslatedTimes().filter(time => !availableSlots.includes(time));

  const slotTable = document.createElement('table');
  availableTimes.forEach(time => {
    const row = document.createElement('tr');
    const timeCell = document.createElement('td');
    timeCell.textContent = time;
    row.appendChild(timeCell);

    const bookButton = document.createElement('button');
    bookButton.textContent = 'Book';
    bookButton.addEventListener('click', () => handleBooking(day, month, time, bookButton));
    row.appendChild(bookButton);
    slotTable.appendChild(row);
  });
  timeSlotsContainer.appendChild(slotTable);
}

// Handle a booking by updating internal state and changing the button appearance
function handleBooking(day: number, month: string, time: string, button: HTMLButtonElement) {
  if (!bookedSlots[month]) bookedSlots[month] = {};
  if (!bookedSlots[month][day]) bookedSlots[month][day] = [];
  bookedSlots[month][day].push(time);

  button.textContent = 'Booked';
  button.disabled = true;
  button.style.backgroundColor = 'red';
}

// This function now uses the correct dropdown ID: "languageSwitch"
function getSelectedLanguage(): string {
  const languageDropdown = document.getElementById("languageSwitch") as HTMLSelectElement;
  return languageDropdown?.value || "en";
}

// Initial setup: create the calendar using the default language and current month.
setupCalendar();
