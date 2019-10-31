const express = require('express');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(fileupload());
app.use(bodyParser.json());

const cardsRoutes = require('./routes/cardRoutes');

app.use('/api', cardsRoutes);

app.listen(port);