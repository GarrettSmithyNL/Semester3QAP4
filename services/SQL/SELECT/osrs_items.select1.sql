SELECT item_name AS Item
  , catagory as Catagory
  , equipment_slot as Slot
FROM osrs_items
WHERE equipment_slot IS NOT NULL;