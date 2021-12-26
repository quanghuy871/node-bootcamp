const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
dotenv.config({path: './config.env'});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
const Tour = require('./../../models/tourModel');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

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
};

// DELETE ALL DATA ON DATABASE
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Successfully delete');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}