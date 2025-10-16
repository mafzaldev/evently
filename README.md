## Event Registration App

This project is a React + TypeScript application built with Vite. It allows users to register for events, reorder events via drag-and-drop, and view their registrations. The app uses Redux Toolkit for state management and localStorage for data persistence.

### Features

- **Event Listing**: Displays a list of events.
- **Drag-and-Drop Reordering**: Reorder events using drag-and-drop functionality powered by `@dnd-kit`.
- **Event Registration**: Register for events with a form.
- **My Registrations**: View all your registrations.
- **Data Persistence**: Events and registrations are persisted in `localStorage`.

### Tech Stack

- **React**: Frontend framework.
- **TypeScript**: Type safety.
- **Vite**: Build tool.
- **Redux Toolkit**: State management.
- **Tailwind CSS**: Styling.
- **@dnd-kit**: Drag-and-drop functionality.
- **localStorage**: Data persistence.

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd event-registration
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Folder Structure

- `src/`
  - `api/` : Mock API functions for simulating backend interactions.
  - `pages/`: Contains React components for different pages.
  - `store/`: Redux slices for state management.
  - `lib/`: Shared utilities, constants and interfaces.
