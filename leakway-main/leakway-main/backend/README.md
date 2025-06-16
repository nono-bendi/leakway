# Leakway Backend Documentation

## Overview
Leakway is a web application designed to allow users to report leaked content easily. The backend is built using Node.js and Express, with PostgreSQL as the database to store takedown requests.

## Features
- **Report Submission**: Users can submit reports for leaked content.
- **Takedown Request Generation**: Automatically generates personalized takedown requests based on user submissions.
- **Request Tracking**: Users can track the status of their takedown requests.

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- PostgreSQL (version 12 or higher)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd leakway/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the PostgreSQL database:
   - Create a new database for the application.
   - Run the SQL schema located in `../database/schema.sql` to set up the necessary tables.

4. Configure environment variables:
   - Create a `.env` file in the `backend` directory and add the following:
     ```
     DATABASE_URL=postgres://<username>:<password>@localhost:5432/<database_name>
     PORT=3000
     ```

### Running the Application
To start the backend server, run:
```
npm start
```
The server will be running on `http://localhost:3000`.

## API Endpoints

### POST /api/reports
- **Description**: Submit a new report for leaked content.
- **Request Body**:
  ```json
  {
    "nom": "string",
    "email": "string",
    "lien": "string",
    "plateforme": "string",
    "commentaire": "string"
  }
  ```

### GET /api/reports/:id
- **Description**: Retrieve the status of a specific takedown request.
- **Parameters**:
  - `id`: The ID of the takedown request.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.