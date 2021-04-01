'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');

const port = process.env.PORT || 3000;
let storeName = process.env.STORE_NAME || `Generic Store`;

const host = `http://localhost:${port}/caps`;
const socket = io.connect(host);

socket.on('delivered', thankYou)

function orderGenerator() {
  setInterval( () => {
    let order = {
      storeName: storeName,
      orderId: faker.datatype.uuid(),
      customerName: faker.name.findName(),
      address: faker.address.streetAddress(),
    }
    let event = { event: 'pickup'}
    socket.emit('pickup', order, event )
  }, 5000)
}

function thankYou(payload) {
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}!`);
}

orderGenerator();

module.exports = {
  makeOrders: orderGenerator,
  thank: thankYou,
}
