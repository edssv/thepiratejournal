const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();

app.use(compression());

app.use(express.static('build'));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 3000, () =>
    console.log(`Server started on PORT = ${process.env.PORT || 3000}`),
);
