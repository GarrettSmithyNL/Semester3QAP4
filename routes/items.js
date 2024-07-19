const express = require("express");
const router = express.Router();
const itemsDal = require("../services/items.dal.js");

router.get("/", async (request, response) => {
  try {
    let theItems = await itemsDal.getItems();
    if (DEBUG) console.table(theItems);
    response.render("items", {
      items: theItems,
      status: request.app.locals.status,
    });
    return;
  } catch {
    if (DEBUG) console.log("Error in items.js router.get(/)");
    response.render("503");
    return;
  }
});

router.get("/:id", async (request, response) => {
  try {
    let theItem = await itemsDal.getItemByID(request.params.id);
    if (DEBUG) console.table(theItem);
    response.render("item", {
      item: theItem[0],
      status: request.app.locals.status,
    });
    return;
  } catch {
    if (DEBUG) console.log("Error in items.js router.get(/:id)");
    response.render("503");
    return;
  }
});

router.get("/:id/delete", async (request, response) => {
  try {
    let theItem = await itemsDal.getItemByID(request.params.id);
    if (DEBUG) console.table(theItem);
    response.render("itemDelete", {
      item: theItem[0],
      status: request.app.locals.status,
    });
    return;
  } catch {
    if (DEBUG) console.log("Error in items.js router.get(/:id/delete)");
    response.render("503");
    return;
  }
});

router.get("/:id/edit", async (request, response) => {
  try {
    let theItem = await itemsDal.getItemByID(request.params.id);
    if (DEBUG) console.table(theItem);
    response.render("itemEdit", {
      item: theItem[0],
      status: request.app.locals.status,
    });
    return;
  } catch {
    if (DEBUG) console.log("Error in items.js router.get(/:id/delete)");
    response.render("503");
    return;
  }
});

router.delete("/:id", async (request, response) => {
  if (DEBUG) console.log("DELETE request received");
  try {
    await itemsDal.deleteItem(request.params.id);
    request.app.locals.status = "Item Deleted Successfully";
    response.redirect("/items");
    return;
  } catch {
    if (DEBUG) console.log("Error in items.js router.delete(/:id)");
    response.render("503");
    return;
  }
});

router.post("/", async (request, response) => {
  if (DEBUG) console.log("POST request received");
  try {
    await itemsDal.addItem(
      request.body.itemID,
      request.body.itemName,
      request.body.membershipReq[0] === "on" ? true : false,
      request.body.tradeable[0] === "on" ? true : false,
      request.body.equipmentSlot === "notEquipable"
        ? null
        : request.body.equipmentSlot,
      request.body.catagory
    );
    request.app.locals.status = "Item Added Successfully";
    response.redirect("/items");
    return;
  } catch (error) {
    if (DEBUG) console.log("Error in items.js router.post(/)");
    if (error.code === "23505") {
      if (DEBUG) console.log("Duplicate item_id");
      request.app.locals.status = "Item ID Already Exists";
      response.redirect("/items");
      return;
    } else {
      response.render("503");
      return;
    }
  }
});

router.patch("/:id", async (request, response) => {
  if (DEBUG) console.log("POST request received");
  try {
    if (DEBUG) console.log(request.body);
    await itemsDal.editItem(
      request.body.itemID,
      request.body.itemName,
      request.body.membershipReq[0] === "on" ? true : false,
      request.body.tradeable[0] === "on" ? true : false,
      request.body.equipmentSlot === "notEquipable"
        ? null
        : request.body.equipmentSlot,
      request.body.catagory
    );
    request.app.locals.status = "Item Edited Successfully";
    response.redirect("/items");
    return;
  } catch (error) {
    if (DEBUG) console.log("Error in items.js router.patch(/)");
    if (error) {
      if (DEBUG) console.log(error);
      response.render("503");
      return;
    }
  }
});

module.exports = router;
