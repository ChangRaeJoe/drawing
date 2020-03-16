const {logger, logStream} = require('../configs/winston')

const NotfoundHandler = function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
}

const errorHandler= function(err, req, res, next) {
    if (process.env.NODE_ENV === 'production') {
    const errObj = {
      req: {
        headers: req.headers,
        query: req.query,
        body: req.body,
        route: req.route
      },
      error: {
        message: err.message,
        stack: err.stack,
        status: err.status
      },
      user: req.user
    }

    logger.error(errObj)
  } else {
    //console 출력
  }

  console.log(err)
  return res.status(500).send('Something broke!');
}


module.exports = {
    NotfoundHandler,
    errorHandler
}