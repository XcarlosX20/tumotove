import ErrorHandler from "./ErrorHandler";
export default function (err, req, res, next) {
  return err.statusCode
    ? ErrorHandler.clientError(err, req, res, next)
    : ErrorHandler.serverError(err, req, res, next);
}
