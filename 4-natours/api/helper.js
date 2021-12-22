const fs = require('fs');

module.exports = JSON.parse(fs.readFileSync(`././dev-data/data/tours-simple.json`, 'utf-8'));