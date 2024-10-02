# Galexeye Project

Galexeye is a full-stack application consisting of a React frontend and a Node.js backend, using a PostgreSQL database hosted on Neon.

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js (assumed)
- Database: PostgreSQL (Neon Database)
- Containerization: Docker

## Project Structure

```
galexeye/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.js
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.js
│   ├── .env
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
```

## Setup and Installation

1. Ensure you have Docker and Docker Compose installed on your system.

2. Clone the repository:

   ```
   git clone [your-repository-url]
   cd [your-project-directory]
   ```

3. Create a `.env` file in the server directory with the following content:

   ```
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   DB_NAME=your_db_name
   ```

4. Build and run the Docker containers:

   ```
   docker-compose up --build
   ```

   This will start both the frontend and backend services.

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:9000

## Environment Variables

### Frontend

- `REACT_APP_API_URL`: Set to `http://localhost:9000` in the Docker Compose file.

### Backend

- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_HOST`: Database host
- `DB_NAME`: Database name

These are used to construct the `DATABASE_URL` in the Docker Compose file.

## API Endpoints

[List your API endpoints here, for example:]

- `POST /api/intersecting-tiles`: Get intersecting tiles

## Database

The project uses a PostgreSQL database hosted on Neon. The connection is established using the `DATABASE_URL` environment variable constructed from the individual DB\_ variables.

## Docker

Both frontend and backend are containerized using Docker. Dockerfiles are located in their respective directories.

## Development

### Frontend

To run the frontend in development mode:

1. Navigate to the `client` directory
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

Available scripts:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.

### Backend

To run the backend in development mode:

1. Navigate to the `server` directory
2. Install dependencies: `npm install`
3. Start the server: `npm run dev` (assuming you have a dev script)

Ensure you have the necessary environment variables set in your `.env` file.

## Connecting Frontend to Backend

The frontend is configured to connect to the backend at `http://localhost:9000`. This is set in the Docker Compose file and should be used for API calls from the frontend.
