const express = require('express');

const app = express();

const port = 3000;

app.get('/home', (req, res) => {
  res
    .status(200)
    // sending json
    .json({ message: `Hello from ${port}`, status: 200, name: 'Abubakar' });
});

app.listen(port, () => {
  console.log(`App is running on port ${port}..`);
});
