# Project Name

Etsi:

An implementation of four primary modules from Etsy.com.

## Related Projects

  - https://github.com/etsi-nyc/addToCart
  - https://github.com/etsi-nyc/photo-carousel
  - https://github.com/etsi-nyc/reviews
  - https://github.com/etsi-nyc/catalog

## Table of Contents

1. Usage
2. Requirements
3. Development

## Usage

To load the module:

<Host>/product/<ItemNumber>

If the item number is valid, the page will dynamically load. 

If invalid, an error message is displayed.

## Requirements

- Node 6.13.0
- Axios 0.18.0
- Bluebird 3.5.2
- Express 4.15.0
- Knex 0.15.2
- Morgan 1.9.1
- MySQL 2.15.0
- React 16.6.0
- React-DOM 16.6.0

## Development

This catalog module for Etsi was implemented using react, relying
heavily on CSS style to achieve the original look of Etsy. Determining
which related items to render is accomplished with a simple database 
query to pull items that are from the same category and also have free
shipping when possible. Once those are expired, any other items from the
same seller will load in the order they were added to the database.

### Installing Dependencies

From within the root directory:

To install webpack and other dependencies: 
  - npm install -g webpack
  - npm install

To populate the database: 
  - npm run seed

To run the server locally:
  In separate terminal windows:
    - npm run react-dev
    - npm run server-dev

To load the page in a browser, navigate to 127.0.0.1:4000/product/1 
  - (127.0.0.1:4000) is the default host. Yours may be different depending on your system.
  - The final number (1) can be replaced with any other valid item id from the database

