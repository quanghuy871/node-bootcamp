const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const server = require('./app');
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

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});