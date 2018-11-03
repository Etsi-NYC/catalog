const express = require('express');
const path = require('path');
const db = require('../db/index.js');
const app = express();
const port = process.env.PORT || 4000;
const morgan = require('morgan');
const Promise = require('bluebird');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/dist')));



const item = {};
const data = {
  seller: {},
  items: []
};

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/listing/:item', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})

app.get('/product/:item', (req, res) => {
  var item = req.params.item
  new Promise((resolve, error) => {
    db.getFirstItem(item, resolve);
  })
    .then(firstItem => {
      if (firstItem === 'error') {
        throw new error('invalid product');
      }
      let sellerID = firstItem[0].seller_id;
      return new Promise((resolve, error) => {
        db.getSeller(sellerID, resolve);
      }).then(seller => {
        buildSeller(seller);
        return new Promise((resolve, error) => {
          db.getSimilarItems(item, resolve);
        }).then(items => {
          buildItems(items);
          res.send(data);
        });
      });
    })
    .catch(error => {
      res.send('error');
    });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

//-------- HELPER FUNCTIONS --------//

const buildLocation = function(city, territory, country) {
  if (territory === null) {
    territory = country;
  }
  return ' ' + city + ', ' + territory;
};

const buildSeller = function(seller) {
  data.seller.name = seller[0].name;
  data.seller.location = buildLocation(
    seller[0].city,
    seller[0].territory,
    seller[0].country
  );
  data.seller.avatar = seller[0].store_thumbnail;
};

const buildItems = function(items) {
  data.items = [];
  for (let item of items) {
    data.items.push(item);
  }
};

exports.item = item;
