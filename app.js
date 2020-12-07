// Import libraries
const express = require("express");

// Add features ---------------------------------------------
const app = express();
app.use(express.json());
// Deprecation error fix
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Import Routes
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

const PORT = process.env.PORT || 5000;
// Init
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
