// Import libraries
const express = require("express");
const cors = require("cors");
const app = express();

// Add features ---------------------------------------------
// New body parser
app.use(express.json());
// Deprecation error removed
app.use(
  express.urlencoded({
    extended: true,
  })
);
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

// Eroor Fallback Route
app.use((err, req, res, next) => {
  res.status(err.code || 500).json({
    message: err.message || "Something went wrong",
    code: err.code || 500,
  });
  return next();
});

// Init
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
