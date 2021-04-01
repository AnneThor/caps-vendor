'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');

const port = process.env.PORT || 3000;
let store = "1-206-flowers";
// let storeId = process.env.STORE_ID || faker.datatype.number().toString();

const host = `http://localhost:${port}/caps`;
const socket = io.connect(host);

socket.emit('join', store);

socket.on('delivered', thankYou)

function orderGenerator() {
  setInterval( () => {
    let order = {
      store: store,
      // storeId: storeId,
      orderID: faker.datatype.uuid(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress(),
    }
    socket.emit('pickup', order )
  }, 5000)
}

function thankYou(payload) {
  console.log(`Thank you for delivering ${payload.orderID}!`);
}

orderGenerator();

module.exports = {
  makeOrders: orderGenerator,
  thank: thankYou,
  socket: socket
}
