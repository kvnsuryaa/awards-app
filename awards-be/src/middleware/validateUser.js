const db = require("../db");
const jwt = require("jsonwebtoken");
const { response } = require("../helpers/Common");

module.exports = async (req, resp, next) => {
  try {
    const auth = req.headers["authorization"];
    if (!auth) return response(resp, 403, "error", {}, "unauthorized token");
    let token = auth.split(" ");
    if (token.length == 1) {
      console.log("Please using Bearer");
      return response(resp, 403, "Please using Bearer", {}, null);
    }

    token = token[1];
    const verify = jwt.verify(token, process.env.SECRET || "SECRET");
    const user_id = verify.id;

    const sql = `SELECT * FROM users WHERE id = $1`;
    const { rows: users } = await db.query(sql, [user_id]);
    if (users.length <= 0) {
      console.log("unauthorized token");
      return [400, "unauthorized token", {}, null];
    }

    const user = users[0];
    resp.locals.user = user;
    next();
  } catch (err) {
    return response(resp, 500, "Error validation user", {}, null);
  }
};
