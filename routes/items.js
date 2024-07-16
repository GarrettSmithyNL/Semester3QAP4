const express = require("express");
const router = express.Router();
const itemsDal = require("../services/items.dal.js");

const items = [
  {
    item_id: 1,
    item_name: "Steel Helm",
    membership_requirement: false,
    tradeable: true,
    equipment_slot: "chest",
    catagory: "armor",
  },
  {
    item_id: 2,
    item_name: "Dragon Dagger",
    membership_requirement: true,
    tradeable: true,
    equipment_slot: null,
    catagory: "log",
  },
  {
    item_id: 3,
    item_name: "Rune Platebody",
    membership_requirement: true,
    tradeable: false,
    equipment_slot: "weapon",
    catagory: "weapon",
  },
];

router.get("/", async (req, res) => {
  try {
    let theItems = await itemsDal.getItems();
    if (DEBUG) console.table(theItems);
    res.render("items", { items: theItems });
  } catch {
    if (DEBUG) console.log("Error in items.js router.get(/)");
    res.render("503");
  }
});

module.exports = router;
