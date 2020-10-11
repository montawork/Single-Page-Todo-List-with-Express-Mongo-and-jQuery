const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todos');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes);

// server port
let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Start server with port ==> ' + port);
});
