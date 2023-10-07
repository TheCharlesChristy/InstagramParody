// Import the Express.js framework, which simplifies building web servers.
import express from 'express';

// Import the body-parser middleware for parsing incoming request bodies.
import bodyParser from 'body-parser';

// Create an instance of the Express application.
const app = express();

// Define the port where your server will listen for incoming requests.
// process.env.PORT is often used in production to allow the hosting environment to set the port
const port = process.env.PORT || 5000;

// Middleware: Use body-parser to parse incoming JSON requests.
app.use(bodyParser.json());

// Define your routes here. You'll create routes for handling different HTTP methods and endpoints.

// For example, a GET request to '/api/data' would be handled here:
app.get('/api/data', (req, res) => {
  // Handle the GET request and send a response.
  // You would typically fetch data from a database here and send it back as JSON.
});

// Similarly, a POST request to '/api/data' would be handled here:
app.post('/api/data', (req, res) => {
  // Handle the POST request and send a response.
  // You would typically insert data into a database here and send a success message.
});

// Start the Express server and listen on the specified port.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
