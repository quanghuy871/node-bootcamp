const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

process.on('uncaughtException', () => {
  process.exit(1);
});

const app = require('./app');
const mongoose = require('mongoose');
const port = process.env.PORT;

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// CONNECT TO DATABASE USING MONGOOSE
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Database successfully connected');
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('unhandledRejection', () => {
  server.close(() => {
    process.exit(1);
  });
});