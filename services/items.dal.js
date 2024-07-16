const dal = require("./osrs_items_db.js");

let getItems = async () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM osrs_items ORDER BY item_id ASC";
    dal.query(sql, [], (error, results) => {
      if (error) {
        if (DEBUG) console.log(error);
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

module.exports = {
  getItems,
};
