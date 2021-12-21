const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

const data = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8');
const dataObj = JSON.parse(data);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours: dataObj,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
});

app.post('/api/v1/tours', (req, res) => {
  const newId = dataObj[dataObj.length - 1].id + 1;
  const newTour = {id: newId, ...req.body};
  dataObj.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(dataObj), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tours: dataObj,
      },
    });
  });
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
