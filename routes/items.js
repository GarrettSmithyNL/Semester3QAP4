const express = require("express");
const router = express.Router();
const itemsDal = require("../services/items.dal.js");

// const items = [
//   {
//     item_id: 1,
//     item_name: "Steel Helm",
//     membership_requirement: false,
//     tradeable: true,
//     equipment_slot: "chest",
//     catagory: "armor",
//   },
//   {
//     item_id: 2,
//     item_name: "Dragon Dagger",
//     membership_requirement: true,
//     tradeable: true,
//     equipment_slot: null,
//     catagory: "log",
//   },
//   {
//     item_id: 3,
//     item_name: "Rune Platebody",
//     membership_requirement: true,
//     tradeable: false,
//     equipment_slot: "weapon",
//     catagory: "weapon",
//   },
// ];

router.get("/", async (request, response) => {
  try {
    let theItems = await itemsDal.getItems();
    if (DEBUG) console.table(theItems);
    if (DEBUG) console.log(request.app.locals.status);
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

router.post("/", async (request, response) => {
  if (DEBUG) console.log("POST request received");
  if (DEBUG) console.log(request.body);
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

module.exports = router;
