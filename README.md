# TempSMS - Temporary Mobile Number for OTP

TempSMS is a web application built on the MERN (MongoDB, Express.js, React, Node.js) stack that provides temporary mobile numbers for receiving One-Time Passwords (OTP). This application aims to simplify the process of testing and receiving OTPs during development and testing phases.

## Features

- Get temporary mobile numbers for OTP verification.
- Receive OTPs from various services without using your personal phone number.
- User-friendly web interface to manage and view received OTPs.
- Secure data storage using MongoDB for storing user information and OTPs.

## Technologies Used

- MongoDB: A NoSQL database for data storage.
- Express.js: A backend web application framework for Node.js.
- React: A frontend library for building user interfaces.
- Node.js: A JavaScript runtime for building server-side applications.
- Axios: A promise-based HTTP client for making API requests.
- Bootstrap: A popular CSS framework for responsive and modern UI.
- Twilio (Optional): Integration with Twilio API for sending SMS.

## Getting Started

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/tempsms.git
   cd tempsms
    npm install
    cd client && npm install && cd ..
    cd server && npm install && cd ..
    # client/.env
    REACT_APP_API_URL=http://localhost:5000
    # server/.env
    PORT=5000
    MONGO_URI=<your-mongodb-uri>
    npm run dev
    ```