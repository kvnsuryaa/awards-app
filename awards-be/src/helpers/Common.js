function response(resp, code, message, data, error) {
  resp.status(code).send({
    code: code,
    message: message || "",
    data: data || {},
    error: error || null,
  });
}

module.exports = {
  response,
};
