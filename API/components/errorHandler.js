  module.exports = {
      clientError: function (err, req, res, next) {
          res.status(400).json({
              "error": err.message
          });
          next(err);
      }
  }