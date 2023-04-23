const fs = require('fs');
// reading the tours from memory and return a list of tours
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//function to get tour by id
function getTour(id) {
  return tours.find((tour) => tour.id === parseInt(id));
}

exports.deleteTourById = (req, res) => {
  console.log(req.params.id);

  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      data: {
        tour: `invalid tour id ${req.params.id}`,
      },
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
exports.updateTour = (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      data: {
        tour: `invalid tour id ${req.params.id}`,
      },
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.getTourById = (req, res) => {
  //console.log(req.params.id);

  const id = req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'Not found',
      date: req.requestTime,
      message: `Tour with id ${id} does not exist`,
    });
  }
  res
    .status(201)
    // sending json
    .json({
      status: 'success',
      data: {
        tour: getTour(req.params.id),
      },
    });
};
exports.createTour = (req, res) => {
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
};

exports.getAllTours = (req, res) => {
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
};
