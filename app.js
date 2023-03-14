const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
app.use(express.json());

// reading the tours from memory
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
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
