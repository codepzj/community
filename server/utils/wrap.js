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

const fail = (msg) => {
  return ResponseData(500, msg, null);
};

module.exports = {
  ResponseData,
  success,
  fail,
};
