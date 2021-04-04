'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');

const port = process.env.PORT || 3000;
let store = process.env.STORE_ID || faker.datatype.number().toString();

const host = `http://localhost:${port}/caps`;
const socket = io.connect(host);

socket.emit('join', store);

orderGenerator();

socket.emit('getAll', {client: store, event: 'delivered' });


socket.on('delivered', thankYou);

function orderGenerator () {
  setInterval( () => {
    let order = {
      store: store,
      orderID: faker.datatype.uuid(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress(),
    }
    socket.emit('pickup', order )
  }, 5000)
}

function thankYou (payload) {
  console.log(`Thank you for delivering ${payload.orderID}!`);
  socket.emit('received', store);
}

module.exports = {
  makeOrders: orderGenerator,
  thank: thankYou,
  socket: socket
}
