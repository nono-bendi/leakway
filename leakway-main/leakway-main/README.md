# Leakway Project

Leakway is a web application designed to allow users to report leaked content easily. The application provides a simple reporting form, generates personalized takedown requests, and tracks the status of each request.

## Features

- User-friendly reporting form for leaked content
- Automatic generation of personalized takedown requests
- Tracking of each request's status
- Backend powered by Node.js and Express
- PostgreSQL database for storing requests

## Project Structure

```
leakway
├── backend
│   ├── src
│   │   ├── app.js
│   │   ├── controllers
│   │   │   └── reportController.js
│   │   ├── models
│   │   │   └── request.js
│   │   ├── routes
│   │   │   └── reportRoutes.js
│   │   └── db
│   │       └── index.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── public
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   └── README.md
├── database
│   └── schema.sql
└── README.md
```

## Setup Instructions

### Backend

1. Navigate to the `backend` directory.
2. Install the necessary dependencies:
   ```
   npm install
   ```
3. Set up the PostgreSQL database using the provided `schema.sql` file.
4. Start the backend server:
   ```
   npm start
   ```

### Frontend

1. Navigate to the `frontend` directory.
2. Open `public/index.html` in a web browser to access the application.

## API Endpoints

- `POST /api/reports`: Submit a new report.
- `GET /api/reports/:id`: Get the status of a specific report.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.