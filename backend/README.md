# TVMaze Backend API

A Node.js Express API built with TypeScript that provides search functionality for TV shows using the TVMaze API.

## Features

-   🔍 Search TV shows by query
-   📺 Get show details by ID
-   📋 Get popular shows list
-   🏥 Health check endpoint
-   🛡️ Error handling and validation
-   🌐 CORS enabled for frontend integration
-   📝 Full TypeScript support with strict typing
-   🔧 ES modules support

## API Endpoints

### Search Shows

```
GET /api/search/shows?q={query}
```

Search for TV shows by query parameter.

**Example:**

```
GET /api/search/shows?q=banana
```

````

## Setup

1. **Install dependencies**:

    ```bash
    npm install
    ```

2. **Create a `.env` file (optional)**:

    ```bash
    PORT=3001
    NODE_ENV=development
    ```

3. **Start the server**:

    ```bash
    # Development mode with auto-restart
    npm run dev

    # Build for production
    npm run build

    # Production mode
    npm start
    ```

The server will start on `http://localhost:3001`

## Development

The project uses TypeScript with ES modules. The source code is in the `src/` directory and gets compiled to `dist/` for production.

### Scripts

-   `npm run dev` - Start development server with hot reload
-   `npm run build` - Compile TypeScript to JavaScript
-   `npm start` - Start production server

## Example Usage

### Search for shows containing "banana":

```bash
curl "http://localhost:3001/api/search/shows?q=banana"
````

## Response Format

All endpoints return JSON responses with the following structure:

**Success Response:**

```json
{
  "success": true,
  "data": [...],
  "count": 10
}
```

**Error Response:**

```json
{
	"error": "Error type",
	"message": "Error description"
}
```

## TypeScript Types

The API includes comprehensive TypeScript types for:

-   `TVMazeShow` - Complete show data structure
-   `TVMazeSearchResult` - Search result with score
-   `APIResponse<T>` - Generic API response wrapper
-   `APIError` - Error response structure

## Dependencies

-   `express` - Web framework
-   `cors` - Cross-origin resource sharing
-   `axios` - HTTP client for API calls
-   `dotenv` - Environment variable management
-   `typescript` - TypeScript compiler
-   `tsx` - TypeScript execution for development
-   `@types/express` - Express TypeScript definitions
-   `@types/cors` - CORS TypeScript definitions
-   `@types/node` - Node.js TypeScript definitions
