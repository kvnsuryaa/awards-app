const db = require("../db");

class Service {
  constructor(user, params, body) {
    this.user = user || {};
    this.params = params;
    this.body = body;
  }

  async getAwards() {
    let { limit, page, type, poin: poin_range } = this.params;
    page = Number(page) || 1;
    limit = Number(limit) || 4;

    const filters = [];
    if (Number(poin_range) > 0) filters.push(`poin >= ${poin_range}`);
    if (type) {
      let type_value = "";
      if (Array.isArray(type)) type_value = type.join(",");
      else type_value = type;

      filters.push(`award_type ILIKE ANY('{${type_value}}')`);
    }

    const offset = limit * page - limit;
    const sql = `SELECT * FROM awards ${
      filters.length > 0 ? "WHERE " + filters.join(" AND ") : ""
    }  OFFSET ${offset} LIMIT ${limit}`;
    console.log(sql);
    const { rows: awards } = await db.query(sql);

    // get max and min poin
    const sql_poin = `SELECT MAX(awards.poin) as max_poin, MIN(awards.poin) as min_poin FROM awards`;
    const { rows: poins } = await db.query(sql_poin);
    const poin = poins[0];

    const data = {
      poin,
      awards,
    };

    return [200, "success", data, null];
  }
}

module.exports = Service;
