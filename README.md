# typescript-app

# Booking Appointment App

This app is designed for booking appointments for service providers such as carpenters, plumbers, or other tradespeople. Built using **TypeScript**, it allows customers to view available appointment slots, book a time, and see when a service provider is available.

## Features

- **Booking System:** Users can view available timeslots for a carpenter or plumber and book appointments for at least 1 hour.
- **Availability Display:** The schedule is displayed from Monday to Friday, with pre-booked times marked as unavailable.
- **Interactive UI:** A simple and user-friendly front-end where users can click to select available timeslots.
- **Backend (future plans):** Integration with a database (like Firebase) for live data storage, tracking bookings, and managing user interactions.

## What’s Implemented So Far

1. **Frontend:**
   - A booking system for a carpenter/plumber with a weekly schedule (Monday to Friday).
   - The schedule displays a pre-booked slot (e.g., Wednesday from 9 AM to 1 PM).
   - Users can click on available timeslots and select a time for booking.

2. **Files:**
   - `index.html`: Contains the main structure and booking interface.
   - `src/app.ts`: Handles the logic for booking and displaying available slots.
   - `src/styles.css`: The basic styling for the booking schedule.
   - `src/index.ts`: Imports and initializes the application logic.

## Future Improvements

- **Backend Integration:** The app will soon integrate with a database (e.g., Firebase) to manage live booking data, allowing for real-time updates on availability.
- **User Registration and Login:** To allow users to manage their appointments.
- **Notifications:** Customers and service providers will receive notifications about new bookings or cancellations.

## How to Run the App Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/jaimehernan95/typescript-app.git
