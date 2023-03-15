const express = require('express');
const fs = require('fs');
const { get } = require('http');

const app = express();
const port = 3000;
app.use(express.json());

// reading the tours from memory and return a list of tours
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// function to get tour by id
function getTourById(id) {
  return tours.find((tour) => tour.id === parseInt(id));
}
app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    // sending json
    .json({
      status: 'success',
      result: tours.length,
      data: {
        tours: tours,
      },
    });
});

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params.id);

  if (req.params.id > tours.length) {
    return res
      .status(404)
      .json({
        status: 'Not found',
        message: `Tour with id ${req.params.id} does not exist`,
      });
  }
  res
    .status(201)
    // sending json
    .json({
      status: 'success',
      data: {
        tour: getTourById(req.params.id),
      },
    });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: 'Error writing to file',
        });
      } else {
        res.status(201).json({
          status: 'success',
          data: {
            tours: newTour,
          },
        });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`App is running on port ${port}..`);
});
