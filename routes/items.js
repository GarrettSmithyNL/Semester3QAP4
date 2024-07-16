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

let checkEquipmentSlot = (request) => {
  if (request.body.headSlot === "on") return "head";
  if (request.body.capeSlot === "on") return "cape";
  if (request.body.neckSlot === "on") return "neck";
  if (request.body.ammoSlot === "on") return "ammo";
  if (request.body.weaponSlot === "on") return "weapon";
  if (request.body.bodySlot === "on") return "body";
  if (request.body.handsSlot === "on") return "hands";
  if (request.body.feetSlot === "on") return "feet";
  if (request.body.ringSlot === "on") return "ring";
  if (request.body.notEquipable === "on") return null;
};

router.get("/", async (req, res) => {
  try {
    let theItems = await itemsDal.getItems();
    if (DEBUG) console.table(theItems);
    res.render("items", { items: theItems });
    return;
  } catch {
    if (DEBUG) console.log("Error in items.js router.get(/)");
    res.render("503");
    return;
  }
});

router.post("/", async (request, response) => {
  if (DEBUG) console.log("POST request received");
  if (DEBUG) console.log(request.body);
  try {
    if (DEBUG) console.log(request.body.itemID);
    if (DEBUG) console.log(request.body.itemName);
    if (DEBUG) console.log(request.body.membershipReq === "on" ? true : false);
    if (DEBUG) console.log(request.body.tradeable === "on" ? true : false);
    if (DEBUG) console.log(checkEquipmentSlot(request));
    if (DEBUG) console.log(request.body.catagory);
    await itemsDal.addItem(
      request.body.itemID,
      request.body.itemName,
      request.body.membershipReq === "on" ? true : false,
      request.body.tradeable === "on" ? true : false,
      checkEquipmentSlot(request),
      request.body.catagory
    );
    response.redirect("/items");
    return;
  } catch {
    if (DEBUG) console.log("Error in items.js router.post(/)");
    response.render("503");
    return;
  }
});

module.exports = router;
