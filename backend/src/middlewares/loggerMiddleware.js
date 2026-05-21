// middleware/logger.js (ES module)
const loggerMiddleware = (req, res, next) => {
  console.log(
    `Middleware: [${new Date().toISOString()}] ${req.method} ${req.url}`,
  );
  req.requestTime = Date.now();
  next(); // pass control to next middleware/route handler
};

export default loggerMiddleware;
