// Import libraries
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();

// Add features ---------------------------------------------
// New body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors
app.use(
  cors({
    origin: "https://bsk-workflow-demo.web.app",
    optionsSuccessStatus: 200,
  })
);

// Import Routes --------------------------------------------
const routes = require("./routes");
app.use(routes);

// Error Fallback Route
app.use((err, req, res, next) => {
  const errorCode = err.code || 500;
  console.log(errorCode);
  res.status(errorCode).send();
  return next();
});

// Init
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
