const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const connectionToDatabase = require('./database');

connectionToDatabase()

app.use(express.json());
app.use(cors());
app.use(routes);
app.disable("x-powered-by");

app.use((error, _req, res, _next) => {
    res.status(error.status || 500);
    res.json({ error: error.message });
});

const PORT = 3322;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});