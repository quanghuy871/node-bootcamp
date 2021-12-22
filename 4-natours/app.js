const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const toursApi = require(`${__dirname}/api/tours`);
app.use('/api', toursApi);

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
