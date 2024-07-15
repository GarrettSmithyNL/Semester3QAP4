const express = require("express");
const router = express.Router();

const items = [
  {
    item_id: 1,
    item_name: "item1",
    membership_requirement: false,
    tradeable: true,
    equipment_slot: "chest",
    catagory: "armor",
  },
  {
    item_id: 2,
    item_name: "item2",
    membership_requirement: true,
    tradeable: true,
    equipment_slot: null,
    catagory: "log",
  },
  {
    item_id: 3,
    item_name: "item3",
    membership_requirement: true,
    tradeable: false,
    equipment_slot: "weapon",
    catagory: "weapon",
  },
];

router.get("/", async (req, res) => {
  console.table(items);
  res.render("items/index", { items: items });
});

module.exports = router;
