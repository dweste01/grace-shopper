const router = require('express').Router();
const Users = require('../models/Users');
const Cart = require('../models/Cart');
const Products = require('../models/Products');
const Orders = require('../models/Orders')




router.get('/:userId', function (req, res, next){
  Users.findById(req.params.userId)
  .then(userFound => {
    res.send(userFound)
  })
  .catch(next)
});
// matches POST requests to /api/users/
router.post('/', function (req, res, next){
  Users.create(req.body)
  .then(userCreated => res.send(userCreated))
  .catch(next)
});
// matches PUT requests to /api/users/:userId
router.put('/:userId', function (req, res, next){
  Users.findById(req.params.userId)
  .then(userFound => {
    return userFound.update(req.body)
  })
  .then(userUpdated => {
    res.send(userUpdated)
  })
  .catch(next)
});
// matches DELTE requests to /api/users/:userId
router.delete('/:userId', function (req, res, next){
  req.user.destroy(req.body)
  .then(() => {
    res.sendStatus(204)
  })
});

// matches GET requests to /api/users/
router.get('/', function (req, res, next){
  Users.findAll()
  .then(usersFound => res.send(usersFound))
  .catch(next)
});

module.exports = router;
