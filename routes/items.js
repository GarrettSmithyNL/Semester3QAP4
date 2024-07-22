// Importing express
const express = require("express");
// Setting up the router
const router = express.Router();
// Importing the items dal
const itemsDal = require("../services/items.dal.js");

// Route for the items page
router.get("/", async (request, response) => {
  try {
    // Getting all the items
    let theItems = await itemsDal.getItems();
    // If debug is true, log the items
    if (DEBUG) console.table(theItems);
    // Render the items page with the items and the status
    response.render("items", {
      items: theItems,
      status: request.app.locals.status,
    });
    return;
  } catch {
    // If there is an error, render the 503 page
    if (DEBUG) console.log("Error in items.js router.get(/)");
    response.render("503");
    return;
  }
});

// Route for the item page for a specific item
router.get("/:id", async (request, response) => {
  try {
    // Get the item by the id
    let theItem = await itemsDal.getItemByID(request.params.id);
    // If debug is true, log the item
    if (DEBUG) console.table(theItem);
    // Render the item page with the item and the status
    response.render("item", {
      item: theItem[0],
      status: request.app.locals.status,
    });
    return;
  } catch {
    // If there is an error, render the 503 page
    if (DEBUG) console.log("Error in items.js router.get(/:id)");
    response.render("503");
    return;
  }
});

// Route for the delete item page
router.get("/:id/delete", async (request, response) => {
  try {
    // Get the item by the id
    let theItem = await itemsDal.getItemByID(request.params.id);
    // If debug is true, log the item
    if (DEBUG) console.table(theItem);
    // Render the delete item page with the item and the status
    response.render("itemDelete", {
      item: theItem[0],
      status: request.app.locals.status,
    });
    return;
  } catch {
    // If there is an error, render the 503 page
    if (DEBUG) console.log("Error in items.js router.get(/:id/delete)");
    response.render("503");
    return;
  }
});

// Route for the edit item page
router.get("/:id/edit", async (request, response) => {
  try {
    // Get the item by the id
    let theItem = await itemsDal.getItemByID(request.params.id);
    // If debug is true, log the item
    if (DEBUG) console.table(theItem);
    // Render the edit item page with the item and the status
    response.render("itemEdit", {
      item: theItem[0],
      status: request.app.locals.status,
    });
    return;
  } catch {
    // If there is an error, render the 503 page
    if (DEBUG) console.log("Error in items.js router.get(/:id/delete)");
    response.render("503");
    return;
  }
});

// Route for the Delete request
router.delete("/:id", async (request, response) => {
  // If debug is true, log the delete request
  if (DEBUG) console.log("DELETE request received");
  try {
    // Delete the item by the id
    await itemsDal.deleteItem(request.params.id);
    // Set the status to "Item Deleted Successfully"
    request.app.locals.status = "Item Deleted Successfully";
    // Redirect to the items page
    response.redirect("/items");
    return;
  } catch {
    // If there is an error, render the 503 page
    if (DEBUG) console.log("Error in items.js router.delete(/:id)");
    response.render("503");
    return;
  }
});

// Route for the Add request
router.post("/", async (request, response) => {
  // If debug is true, log the post request
  if (DEBUG) console.log("POST request received");
  try {
    // add the item with the request body
    await itemsDal.addItem(
      request.body.itemID,
      request.body.itemName,
      // If the membershipReq is on, set it to true, else set it to false
      request.body.membershipReq[0] === "on" ? true : false,
      // If the tradeable is on, set it to true, else set it to false
      request.body.tradeable[0] === "on" ? true : false,
      // If the equipmentSlot is notEquipable, set it to null, else set it to the equipmentSlot
      request.body.equipmentSlot === "notEquipable"
        ? null
        : request.body.equipmentSlot,
      request.body.catagory
    );
    // Set the status to "Item Added Successfully"
    request.app.locals.status = "Item Added Successfully";
    // Redirect to the items page
    response.redirect("/items");
    return;
  } catch (error) {
    // If debug is true, log the error
    if (DEBUG) console.log("Error in items.js router.post(/)");
    // If the error code is 23505, set the status to "Item ID Already Exists" and redirect to the items page
    if (error.code === "23505") {
      if (DEBUG) console.log("Duplicate item_id");
      request.app.locals.status = "Item ID Already Exists";
      response.redirect("/items");
      return;
    } else {
      // If there is an error, render the 503 page
      response.render("503");
      return;
    }
  }
});

// Route for the Patch request
router.patch("/:id", async (request, response) => {
  // If debug is true, log the patch request
  if (DEBUG) console.log("POST request received");
  try {
    // Edit the item with the request body
    await itemsDal.editItem(
      request.body.itemID,
      request.body.itemName,
      // If the membershipReq is on, set it to true, else set it to false
      request.body.membershipReq[0] === "on" ? true : false,
      // If the tradeable is on, set it to true, else set it to false
      request.body.tradeable[0] === "on" ? true : false,
      // If the equipmentSlot is notEquipable, set it to null, else set it to the equipmentSlot
      request.body.equipmentSlot === "notEquipable"
        ? null
        : request.body.equipmentSlot,
      request.body.catagory
    );
    // Set the status to "Item Edited Successfully"
    request.app.locals.status = "Item Edited Successfully";
    // Redirect to the items page
    response.redirect("/items");
    return;
  } catch (error) {
    // If debug is true, log the error
    if (DEBUG) console.log("Error in items.js router.patch(/)");
    // If there is a error, render the 503 page
    response.render("503");
    return;
  }
});

module.exports = router;
