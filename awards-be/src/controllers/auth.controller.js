const { response } = require("../helpers/Common");
const Service = require("../services/auth.service");

async function login(req, resp) {
  try {
    const query = req.query;
    const params = req.params;
    const body = req.body;

    const paramaters = { ...query, ...params };
    const service = new Service(null, paramaters, body);
    const [status, message, data, error] = await service.login();
    return response(resp, status, message, data, error);
  } catch (err) {
    console.log("Error while login", err);
    return response(resp, 500, "Error while login", {}, null);
  }
}

module.exports = {
  login,
};
