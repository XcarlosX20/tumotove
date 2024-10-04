export default {
  clientError(err, req, res, next) {
    res.status(err.statusCode).json({ message: err.message || err });
  },

  serverError(err, req, res, next) {
    const message = err.stack ? `\n ${err.stack}` : ` - ${err}`;
    console.error(`${new Date()} - ${req.method} - ${req.url} ${message}`);
    res.status(500).json({ message: err.message || err });
  },
};
