# TVMaze Frontend

A React-based frontend application for the TVMaze show search platform. Built with TypeScript, Vite, and Material-UI for a modern, responsive user experience.

## Features

-   **Real-time Search**: Search for TV shows with instant results
-   **Show Cards**: Display show information with ratings and genres
-   **Modal Details**: Click to view comprehensive show information
-   **Responsive Design**: Works seamlessly on desktop and mobile
-   **Loading States**: Smooth loading indicators during API calls
-   **Error Handling**: User-friendly error messages

## Tech Stack

-   **React 19** - UI library
-   **TypeScript** - Type safety
-   **Vite** - Build tool and dev server
-   **Material-UI** - Component library
-   **Axios** - HTTP client for API calls

## Project Structure

```
src/
├── components/           # React components
│   ├── LoadingSpinner.tsx
│   ├── SearchBar.tsx
│   ├── ShowCard.tsx
│   └── ShowDetailsModal/
│       ├── ExternalLink.tsx
│       ├── InfoField.tsx
│       ├── NetworkChannel.tsx
│       └── ShowDetailsModal.tsx
├── hooks/               # Custom React hooks
│   └── useShowSearch.ts
├── services/            # API service layer
│   └── api.ts
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Getting Started

1. **Install dependencies**:

    ```bash
    npm install
    ```

2. **Start development server**:

    ```bash
    npm run dev
    ```

3. **Open your browser**:
   Navigate to http://localhost:5173

## Available Scripts

-   `npm run dev` - Start development server with hot reload
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build locally

## Development

### Components

-   **SearchBar**: Handles user input with debounced search
-   **ShowCard**: Displays individual show information
-   **ShowDetailsModal**: Comprehensive show details in a modal
-   **LoadingSpinner**: Loading indicator component

### Hooks

-   **useShowSearch**: Manages search state and API calls

### API Integration

The frontend communicates with the backend API at `http://localhost:3001`:

-   `GET /api/search/shows?q={query}` - Search shows

## Styling

-   Material-UI theme for consistent design
-   Responsive grid layout for show cards
-   Gradient background for visual appeal
-   Custom styling with Material-UI's `sx` prop

## TypeScript

The application uses TypeScript for type safety. Shared types are imported from the `shared/` directory:

-   `TVMazeShow` - Complete show data structure
-   `TVMazeSearchResult` - Search result with score
-   `APIResponse<T>` - Generic API response wrapper

## Build and Deployment

1. **Build for production**:

    ```bash
    npm run build
    ```

2. **Preview production build**:
    ```bash
    npm run preview
    ```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.
