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

const buildLocation = function(thisCity, thisTerritory, thisCountry) {
  if (thisTerritory === null) {
    thisTerritory = thisCountry;
  }
  return ' ' + thisCity + ', ' + thisTerritory;
};

app.get('/not-items', (req, res) => {
  var id = item.id;
  let data = {
    seller: {},
    items: []
  };
  new Promise((resolve, error) => {
    db.getFirstItem(id, resolve);
  })
    .then(row => {
      if (row === 'error') {
        throw new error('invalid product');
      }
      let seller = row[0].seller_id;
      return new Promise((resolve, error) => {
        db.getSeller(seller, resolve);
      }).then(seller => {
        data.seller.name = seller[0].name;
        data.seller.location = buildLocation(
          seller[0].city,
          seller[0].territory,
          seller[0].country
        );
        data.seller.avatar = seller[0].store_thumbnail;
        return new Promise((resolve, error) => {
          db.getSimilarItems(id, resolve);
        }).then(items => {
          for (let item of items) {
            data.items.push(item);
          }
          res.send(data);
        });
      });
    })
    .catch(error => {
      res.send('error');
    });
});

app.get('/product/:item', (req, res) => {
  item.id = req.params.item;
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

exports.item = item;
