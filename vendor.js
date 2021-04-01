'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');

const port = process.env.PORT || 3000;
let storeName = `1-206-flowers`;
let storeId = faker.datatype.number().toString();

const host = `http://localhost:${port}/caps`;
const socket = io.connect(host);

socket.emit('join', storeId);

socket.on('delivered', thankYou)

function orderGenerator() {
  setInterval( () => {
    let order = {
      storeName: storeName,
      storeId: storeId,
      orderID: faker.datatype.uuid(),
      customerName: faker.name.findName(),
      address: faker.address.streetAddress(),
    }
    let event = { event: 'pickup'}
    socket.emit('pickup', order, event )
  }, 5000)
}

function thankYou(payload) {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}!`);
}

orderGenerator();

module.exports = {
  makeOrders: orderGenerator,
  thank: thankYou,
}
