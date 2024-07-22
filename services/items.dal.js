// Require the database connection
const dal = require("./osrs_items_db.js");

// Function to get all the items
let getItems = async () => {
  // If debug is true, log that the function was called
  if (DEBUG) console.log("getItems() called");
  // Return a promise
  return new Promise((resolve, reject) => {
    // SQL query to get all the items
    const sql = "SELECT * FROM osrs_items ORDER BY item_id ASC";
    // Query the database
    dal.query(sql, [], (error, results) => {
      // If there is an error, reject the promise
      if (error) {
        // Reject the promise
        reject(error);
      } else {
        // If there is no error, resolve the promise with the rows
        resolve(results.rows);
      }
    });
  });
};

// Function to get an item by the id
let getItemByID = async (itemID) => {
  // If debug is true, log that the function was called
  if (DEBUG) console.log("getItem() called");
  // Return a promise
  return new Promise((resolve, reject) => {
    // SQL query to get the item by the id
    const sql = "SELECT * FROM osrs_items WHERE item_id = $1";
    // Query the database
    dal.query(sql, [itemID], (error, results) => {
      // If there is an error, reject the promise
      if (error) {
        // Reject the promise
        reject(error);
      } else {
        // If there is no error, resolve the promise with the rows
        resolve(results.rows);
      }
    });
  });
};

// Function to add an item
let addItem = async (
  itemID,
  itemName,
  membershipReq,
  tradeable,
  equipmentSlot,
  catagory
) => {
  // If debug is true, log that the function was called
  if (DEBUG) console.log("addItem() called");
  // Return a promise
  return new Promise((resolve, reject) => {
    // SQL query to add an item
    const sql =
      "INSERT INTO osrs_items (item_id, item_name, membership_requirement, tradeable, equipment_slot, catagory) VALUES ($1, $2, $3, $4, $5, $6)";
    // Query the database
    dal.query(
      sql,
      [itemID, itemName, membershipReq, tradeable, equipmentSlot, catagory],
      (error, results) => {
        // If there is an error, reject the promise
        if (error) {
          // Reject the promise
          reject(error);
        } else {
          // If there is no error, resolve the promise with the rows
          resolve(results.rows);
        }
      }
    );
  });
};

// Function to delete an item
let deleteItem = (itemID) => {
  // If debug is true, log that the function was called
  if (DEBUG) console.log("deleteItem() called");
  // Return a promise
  return new Promise((resolve, reject) => {
    // SQL query to delete an item by the id
    const sql = "DELETE FROM osrs_items WHERE item_id = $1";
    // Query the database
    dal.query(sql, [itemID], (error, results) => {
      // If there is an error, reject the promise
      if (error) {
        // Reject the promise
        reject(error);
      } else {
        // If there is no error, resolve the promise with the rows
        resolve(results.rows);
      }
    });
  });
};

// Function to edit an item
let editItem = (
  itemID,
  itemName,
  membershipReq,
  tradeable,
  equipmentSlot,
  catagory
) => {
  // If debug is true, log that the function was called
  if (DEBUG) console.log("editItem() called");
  // Return a promise
  return new Promise((resolve, reject) => {
    // SQL query to update an item by the id
    const sql = `UPDATE osrs_items SET 
                  item_name = $2, 
                  membership_requirement = $3, 
                  tradeable = $4, 
                  equipment_slot = $5, 
                  catagory = $6 
                WHERE item_id = $1`;
    // Query the database
    dal.query(
      sql,
      [itemID, itemName, membershipReq, tradeable, equipmentSlot, catagory],
      (error, results) => {
        // If there is an error, reject the promise
        if (error) {
          // Reject the promise
          reject(error);
        } else {
          // If there is no error, resolve the promise with the rows
          resolve(results.rows);
        }
      }
    );
  });
};

module.exports = {
  getItems,
  addItem,
  getItemByID,
  deleteItem,
  editItem,
};
