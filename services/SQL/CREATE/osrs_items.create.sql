CREATE TABLE osrs_items (
  item_id SERIAL PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  membership_requirement BOOLEAN NOT NULL,
  tradeable BOOLEAN NOT NULL,
  equipment_slot VARCHAR(255),
  catagory VARCHAR(255) NOT NULL
);
