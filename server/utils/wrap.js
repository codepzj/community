// 返回数据格式
let ResponseData = (code, msg, data) => {
  return {
    code,
    msg,
    data,
  };
};

const success = (msg, data) => {
  return ResponseData(200, msg, data);
};

const failOnClient = (msg) => {
  return ResponseData(400, msg, null);
};

const failOnServer = (msg) => {
  return ResponseData(500, msg, null);
};

module.exports = {
  ResponseData,
  success,
  failOnClient,
  failOnServer,
};
