const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const fs = require('fs');
const Tour = require('./../../models/tourModel');
const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// CONNECT TO DATABASE USING MONGOOSE
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Database successfully connected');
});

// IMPORT DATA TO DATABASE
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Successfully import');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA ON DATABASE
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Successfully delete');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}