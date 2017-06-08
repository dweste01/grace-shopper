const router = require('express').Router();
const Orders = require('../models/Orders');
const Users = require('../models/Users');

// //taking supplied order id and attaching product object to request
// router.param('order', function(req, res, next, id){
//   Orders.findById(id, { include: [Users] })
//   .then(order => {req.order = order})
// })

// matches GET requests to /api/orders/
router.get('/', function (req, res, next){
  Orders.findAll()
  .then(ordersFound => {
    // let order = ordersFound[0];
    // // console.log('orders found on api route: ', ordersFound)
    // console.log(order.getUser());
    res.send(ordersFound)
  })
  .catch(next)
});

router.get('/:orderId', function (req, res, next){
  Orders.findById(req.params.orderId)
  .then(orderFound => {
    res.send(orderFound)
  })
  .catch(next)
});

router.get('/users/:userId', function (req, res, next){
  Orders.findAll({
    where: {
      userId: req.params.userId
    }
  })
  .then(ordersFound => {
    res.send(ordersFound)
  })
  .catch(next)
});
// matches POST requests to /api/orders/
router.post('/', function (req, res, next){
  Orders.create(req.body)
  .then(orderCreated => res.send(orderCreated))
  .catch(next)
});
// matches PUT requests to /api/orders/:orderId
router.put('/:orderId', function (req, res, next){
  req.order.update(req.body)
  .then(orderUpdated => res.send(orderUpdated))
  .catch(next)
});
// matches DELTE requests to /api/orders/:orderId
router.delete('/:orderId', function (req, res, next){
  req.order.destroy(req.body)
  .then(() => {
    res.sendStatus(204)
  })
});

module.exports = router;
