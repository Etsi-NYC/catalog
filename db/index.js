var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'catalog.cqh0pq5hjlwt.us-east-2.rds.amazonaws.com',
    port: 3306,
    user: 'grantdiamond',
    password: 'EtsiCatalogV1',
    database: 'etsi'
  }
});

var getFirstItem = function(itemNum, cb) {
  knex
    .select()
    .from('items')
    .where('item_id', '=', Number(itemNum))
    .then(row => {
      if (row.length === 0) {
        cb('error');
      }
      cb(row);
    });
};

var getSeller = function(id, cb) {
  knex
    .select()
    .from('sellers')
    .where('seller_id', '=', Number(id))
    .then(seller => {
      cb(seller);
    });
};

var getSimilarItems = function(itemNum, cb) {
  knex
    .select('item_category', 'seller_id')
    .from('items')
    .where('item_id', '=', itemNum)
    .then(results => {
      let sellerId = results[0].seller_id;
      let category = results[0].item_category;
      return knex
        .select()
        .from('items')
        .where('seller_id', '=', sellerId)
        .andWhere('item_id', '<>', itemNum)
        .andWhere('item_category', '=', category)
        .andWhere('free_shipping', '=', 1)
        .orWhere('item_category', '<>', category)
        .orWhere('free_shipping', '=', 0)
        .limit(9);
    })
    .then(rows => {
      cb(rows);
    });
};

exports.getFirstItem = getFirstItem;
exports.getSeller = getSeller;
exports.getSimilarItems = getSimilarItems;
