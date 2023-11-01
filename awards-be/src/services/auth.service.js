const jwt = require("jsonwebtoken");
const db = require("../db");

class Service {
  constructor(user, params, body) {
    this.user = user || {};
    this.params = params;
    this.body = body;
  }

  async login() {
    const { email } = this.body;

    // validation
    if (!email) {
      console.log("Invalid request");
      return [400, "Invalid Requests", {}, null];
    }

    const sql = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await db.query(sql, [email]);
    if (rows.length <= 0) {
      console.log("Username or password wrong!");
      return [404, "Username or password wrong!", {}, null];
    }

    const user = rows[0];
    const token = jwt.sign({ id: user.id }, process.env.SECRET || "SECRET");

    const data = {
      email: user.email,
      token: token,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    console.log(`succes login ${user.email}`);
    return [200, "success", data, null];
  }
}

module.exports = Service;
