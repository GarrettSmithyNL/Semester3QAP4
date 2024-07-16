SELECT item_name AS Item
  , item_id AS ID
  , catagory as catagory
FROM osrs_items
WHERE tradeable = false;