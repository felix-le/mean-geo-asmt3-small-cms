require('dotenv').config();
const express = require('express');
const logger = require('morgan'); // log request
const cors = require('cors'); // Cross-Origin Resource Sharing
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cache = require('./routeCache');
const routes = require('./routes/index'); // import routes
const app = express();

app.use(cors());
app.use(logger('dev')); //logger in dev mode, comment out in production
app.use(express.json());
app.use(cookieParser());
// try to connect mongoose
const URI = process.env.MONGO_HOST;

mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
  }
);

// port default is 3000 or can create .env file to set port
const PORT = process.env.PORT || 5500;

app.use('/', cache(300), routes); // use routes

app.listen(PORT, () => {
  console.log('Server is running on port', PORT || 5500);
});
