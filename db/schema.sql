CREATE DATABASE IF NOT EXISTS etsi;

USE etsi;

CREATE TABLE IF NOT EXISTS sellers (
  seller_id INT AUTO_INCREMENT,
  name VARCHAR(25),
  store_thumbnail VARCHAR(250),
  city VARCHAR(25),
  territory VARCHAR(25),
  country VARCHAR(50),
  PRIMARY KEY (seller_id) 
);


CREATE TABLE IF NOT EXISTS items (
  item_id INT AUTO_INCREMENT,
  title VARCHAR(100),
  item_thumbnail VARCHAR(250),
  item_category VARCHAR(25),
  price DECIMAL(7,2),
  sale_price DECIMAL (7,2) DEFAULT null,
  free_shipping BOOLEAN DEFAULT 0,
  seller_id INT,
  PRIMARY KEY (item_id),
  FOREIGN KEY fk_seller (seller_id)
  REFERENCES sellers (seller_id)
);

INSERT INTO
  sellers(name, store_thumbnail, city, territory, country)
VALUES
  ("Grant's Pants", 
  "https://i.etsystatic.com/isla/eefd00/33773735/isla_75x75.33773735_qy04k4fm.jpg?version=0",
  "Lala",
  "Happy Land",
  "United States"
  );

INSERT INTO
  items(title, item_thumbnail, item_category, price, free_shipping, seller_id)
VALUES
  ("Too-large blanket", 
  "https://i.etsystatic.com/10899829/c/2513/1996/242/0/il/c9750a/1435058207/il_340x270.1435058207_ehvr.jpg", 
  "Pants", 34.34, 1, 1),
  ("Happy baby in blanket", 
  "https://i.etsystatic.com/10899829/d/il/5b35e0/1454713033/il_340x270.1454713033_sbfo.jpg?version=0", 
  "Pants", 34.34, 1, 1),
  ("Posing child in front of a camera", 
  "https://i.etsystatic.com/10899829/d/il/af3ba4/1458382493/il_340x270.1458382493_4km8.jpg?version=0", 
  "Pants", 29.34, 1, 1),
  ("name of product here!", 
  "https://i.etsystatic.com/10899829/d/il/ef9604/1671282769/il_340x270.1671282769_g0u1.jpg?version=0", 
  "Pants", 22.34, 1, 1),
  ("Wonderful blanket for baby", 
  "https://i.etsystatic.com/10899829/d/il/aa0f3f/1627906815/il_340x270.1627906815_7j6t.jpg?version=0", 
  "Pants", 43.34, 1, 1),
  ("These are not pants", 
  "https://i.etsystatic.com/10899829/d/il/6b57a0/1405753330/il_340x270.1405753330_lscf.jpg?version=0", 
  "Pants", 35.34, 1, 1),
  ("Dummy data > real data", 
  "https://i.etsystatic.com/10899829/c/2064/1639/381/242/il/fd7199/1385169465/il_340x270.1385169465_j2eh.jpg", 
  "Pants", 122.34, 1, 1),
  ("Once upon a time a baby needed blankie", 
  "https://i.etsystatic.com/10899829/d/il/29bad3/999468647/il_340x270.999468647_1d0f.jpg?version=0", 
  "Pants", 99.99, 1, 1),
  ("buy me! i'm a great product.", 
  "https://i.etsystatic.com/10899829/c/2182/1733/605/137/il/bb7c18/1432203374/il_340x270.1432203374_trdk.jpg", 
  "Pants", 5.55, 1, 1),
  ("Etsi Team Alpha!", 
  "https://i.etsystatic.com/10899829/d/il/72989c/1639285992/il_340x270.1639285992_spro.jpg?version=0", 
  "Pants", 1.34, 1, 1);
