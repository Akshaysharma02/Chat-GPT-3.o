const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, _req, res, _next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose cast Error
  if (err.name === "CastError") {
    const message = "Resource Not Found";
    error = new ErrorResponse(message, 404);
  }
  // Duplicate key error
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }
  // Mongoose validation
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message).join(', ');
    error = new ErrorResponse(message, 400);
  }
  
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
