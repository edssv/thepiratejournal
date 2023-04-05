const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();

app.use(compression());

app.use('/dashboard', express.static('build'));

app.get('/dashboard/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 3001, () => console.log(`Server started on PORT = ${process.env.PORT || 3001}`));