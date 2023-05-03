const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const dataRoute = require("./routes/dataRoute")
const port = 8080
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("", dataRoute)

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;