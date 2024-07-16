SELECT item_name AS Item
  , item_id AS ID
  , catagory as Catagory
FROM osrs_items
WHERE membership_requirement = true;