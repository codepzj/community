function logger(req, res, next) {
  // 获取请求时间
  const startTime = Date.now();
  // 获取请求方法
  const method = req.method;
  // 获取请求路径
  const url = req.url;

  // 打印请求信息
  console.log(`${method} ${url} ${Date.now() - startTime}ms`);
  next();
}

module.exports = logger;
