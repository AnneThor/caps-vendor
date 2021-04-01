'use strict';

const { makeOrders, thank, socket } = require('../vendor.js');

describe("VENDOR functionality", () => {

  let payload = {
    storeName: 'Generic Store Name',
    storeId: '4568',
    orderID: '123456',
    customerName: 'Jane Doe',
    address: '1428 Elm Street',
  }

  let delivered = { event: 'delivered' };

  let spy;

  beforeEach(()=> {
    jest.useFakeTimers();
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  test('the ORDER GENERATOR is properly making order objects', () => {
    makeOrders();
    spy = jest.spyOn(socket, 'emit').mockImplementation();
    jest.advanceTimersByTime(5000*15);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(15);
  })

  test('that the THANK YOU function logs the correct information', () => {
    spy = jest.spyOn(console, 'log').mockImplementation();
    thank(payload);
    jest.advanceTimersByTime(5000);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(`Thank you for delivering ${payload.orderID}!`);
  })

})
