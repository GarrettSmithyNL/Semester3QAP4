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

let getItemByID = async (id) => {
  if (DEBUG) console.log("getItem() called");
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM osrs_items WHERE item_id = $1";
    dal.query(sql, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

let addItem = async (
  itemID,
  itemName,
  membershipReq,
  tradeable,
  equipmentSlot,
  catagory
) => {
  if (DEBUG) console.log("addItem() called");
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO osrs_items (item_id, item_name, membership_requirement, tradeable, equipment_slot, catagory) VALUES ($1, $2, $3, $4, $5, $6)";
    dal.query(
      sql,
      [itemID, itemName, membershipReq, tradeable, equipmentSlot, catagory],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.rows);
        }
      }
    );
  });
};

let deleteItem = (id) => {
  if (DEBUG) console.log("deleteItem() called");
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM osrs_items WHERE item_id = $1";
    dal.query(sql, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

module.exports = {
  getItems,
  addItem,
  getItemByID,
  deleteItem,
};
