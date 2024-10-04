const catchErrors = (fn) => async (req, res, next) =>
  fn(req, res, next).catch(next);

export default catchErrors;