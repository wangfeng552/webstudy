const successController = r => require.ensure([], () => r(require('./success')), 'success');
const failController = r => require.ensure([], () => r(require('./fail')), 'fail');
const systemBusyController = r => require.ensure([], () => r(require('./system-busy')), 'system-busy');
const makeOrderController = r => require.ensure([], () => r(require('./make-order')), 'make-order');
const timeController = r => require.ensure([], () => r(require('./time')), 'time');
const invoiceController = r => require.ensure([], () => r(require('./invoice')), 'invoice');

var OrderDownRouter = [{
  path: '/success',
  component: successController,
  name:'success'
}, {
  path: '/fail',
  component: failController,
  name:'fail'
}, {
  path: '/system-busy',
  component: systemBusyController,
  name:'system-busy'
}, {
  path: '/make-order',
  component: makeOrderController,
  name:'make-order'
}, {
  path: '/time',
  component: timeController,
  name:'time'
}, {
  path: '/invoice',
  component: invoiceController,
  name:'invoice'
}]

export {
  OrderDownRouter
}
