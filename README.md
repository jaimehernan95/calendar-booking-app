# Booking Appointment App using TypeScript

This app is designed for booking appointments for service providers such as carpenters, plumbers, or other tradespeople. Built using TypeScript, it allows customers to view available appointment slots, book a time, and see when a service provider is available.

---

## Features

- **Booking System**: Users can view available time slots for a carpenter/plumber and book appointments.
- **Availability Display**: The schedule is displayed from Monday to Friday, with pre-booked times marked as unavailable.
- **Interactive UI**: A user-friendly interface where users can click to select available time slots.
- **Real-time Booking**: Allows for the booking of slots, and updates the UI immediately to reflect booked times.
- **Backend Integration (Future plans)**: The app will integrate with a backend (like Firebase) for live data storage, tracking bookings, and managing user interactions.

---

## What’s Implemented So Far

### Frontend:
- **Booking System**: Users can view and book available time slots (Monday to Friday) for service providers.
- **Time Slot Availability**: Pre-booked slots are marked as unavailable.
- **Interactive Booking**: Users can click on available slots, which changes the slot’s status to "Booked" upon selection.
- **Visual Updates**: Slots that are booked are visually marked as "Booked" (e.g., with red buttons), and users can no longer book them.

### Files:
- **index.html**: Contains the main structure and booking interface.
- **src/app.ts**: Manages the logic for booking and displaying available slots.
- **src/styles.css**: Provides basic styling for the booking schedule and UI.
- **src/index.ts**: Imports and initializes the application logic, including the calendar and booking functionality.

---

## Progress from Last Year
- **Calendar View**: Added a calendar view where each day has clickable buttons for selecting available timeslots.
- **Booking Functionality**: Users can now click on available time slots to book them, with real-time updates on availability.
- **Visual Feedback**: When a time slot is booked, it changes to display "Booked" and is disabled for further interaction.
- **State Management**: Implemented a basic state to track booked slots using a `Set` data structure for each day.

---

## Future Improvements
- **Backend Integration**: The app will soon integrate with a database (e.g., Firebase) to manage live booking data, allowing for real-time updates on availability and tracking bookings.
- **User Registration and Login**: Allow users to register, log in, and manage their appointments.
- **Notifications**: Implement notifications for customers and service providers regarding new bookings, cancellations, or updates.
- **Mobile Optimization**: Enhance responsiveness for mobile devices to ensure the app is fully functional on smartphones and tablets.

---

## How to Run the App Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jaimehernan95/typescript-app.git


## Final Result

This is the final result of the task. The image below shows the working calendar with time slot booking functionality.

![Booking an appointment with a Plumber Final Result](assets/images/plumber.png)
