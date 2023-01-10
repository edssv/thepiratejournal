const express = require('express');
const compression = require('compression');

const app = express();

app.use(compression());

app.use(express.static('build'));

app.listen(process.env.PORT || 3000, () =>
    console.log(`Server started on PORT = ${process.env.PORT || 3000}`),
);
