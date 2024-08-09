const errorHandler = (statusCode, message) => {
  return (req, res, next) => {
    res.status(statusCode).json({ error: message });
  };
};

module.exports = errorHandler;
