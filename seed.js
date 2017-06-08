var Promise = require('bluebird');
var db = require('./server/db');
// var { cart, user, order, product, review } = db
var Users = require('./server/models').Users;
var Carts = require('./server/models').Carts;
var Orders = require('./server/models').Orders;
var Products = require('./server/models').Products;
var Reviews = require('./server/models').Reviews;
var Product_Orders = require('./server/models').Product_order

var data = {
	users: [
	    {email: "Mars@venus.jupiter", password: "123", firstName: 'Eli', lastName: 'Nemzer', address1: '123 fake st', address2: 'd8', city:'Chicago', state:'NM', zipcode:'11111', isAdmin: 'false'},
	    {email: "Space@venus.jupiter", password: "123", firstName: 'Danielle', lastName: 'Westerman', address1: '123 Fake Stt', address2: '', city:'Loudon', state:'NH', zipcode:'10250', isAdmin: 'false'},
	    {email: "Dogpound@venus.jupiter", password: "123", firstName: 'Emily', lastName: 'Acres', address1: '45 Main Ct', address2: 'z12', city:'Austin', state:'TX', zipcode:'13063', isAdmin: 'true'},
	    {email: "Hello@venus.jupiter", password: "123", firstName: 'Jeremy', lastName: 'Wicks', address1: '60 Star Cir', address2: '', city:'Orlando', state:'MD', zipcode:'21122', isAdmin: 'false'},
	    {email: "Gmail@venus.jupiter", password: "123", firstName: 'Hot-Geoff', lastName: 'Bass', address1: '75 Chalice Dr', address2: 'y15', city:'Baja', state:'NM', zipcode:'30468', isAdmin: 'false'},
	    {email: "Yahoo@venus.jupiter", password: "123", firstName: 'Dan', lastName: 'TheMan', address1: '102 One Hundred Two St', address2: '8', city:'Mars', state:'NJ', zipcode:'10563', isAdmin: 'false'},
  	],
  	products: [
	    {title: "One Fish", description: 'A very smug blue fish with arms instead of fins', region:'North America', imageUrl:'https://s-media-cache-ak0.pinimg.com/originals/6e/a6/32/6ea63291143bd6e5122afd2450d85acc.jpg', price:27.50},
	    {title: "Two Fish", description: 'More than one fish. Tried to get them to split this into two listings but they ignored me.', region:'South America', imageUrl:'http://abacus.bates.edu/~sross/pets/bethsfish.jpg', price:3.99},
	    {title: "Red Fish", description: 'Not a fish. Please do not buy.', region:'Asia', imageUrl:'http://lorempixel.com/output/animals-q-c-640-480-5.jpg', price:4000.99},
	    {title: "Blue Fish", description: 'This fish is deceased', region:'Europe', imageUrl:'https://media2.fdncms.com/clevescene/imager/afternoon-brew-dead-fish-beating-cops-apology-for-attempted-robbery-and/u/original/2325377/1297117167-dead-fish.jpg', price:.10},
	    {title: "Orange Fish", description: 'Bought too many of these in the late 90s. Selling at steep discount.', region:'Africa', imageUrl:'https://pbs.twimg.com/profile_images/3509869132/6e66cb064de4b9ce3d13a544314c57db_400x400.jpeg', price:.90},
	    {title: "Shark", description: 'My child drew this and wouldn\'t stop screaming until I put it on the site', region:'Australia', imageUrl:'https://68.media.tumblr.com/2b46544962f64861f565f614e33c58be/tumblr_n1zlzfNerc1r4khp7o2_500.png', price:100.00},
   ],
 	carts: [
	    {UserId: 1, ProductId: 2, quantity: 5},
	    {UserId: 2, ProductId: 1, quantity: 3},
	    {UserId: 4, ProductId: 3, quantity: 2},
	    {UserId: 5, ProductId: 2, quantity: 2},
	    {UserId: 3, ProductId: 1, quantity: 10},
	    {UserId: 2, ProductId: 2, quantity: 1},

  	],

   orders: [
	    {status: 'Created', datePlaced:'2017-01-01' , UserId: 1},
	    {status: 'Processing', datePlaced:'2016-02-28', UserId:2},
	    {status: 'Cancelled', datePlaced:'2017-03-01', UserId:3},
	    {status: 'Completed', datePlaced:'2017-05-02', UserId:4},
	    {status: 'Completed', datePlaced:'2017-01-03', UserId:5}

   ],

   reviews: [
	    {rating: '1', title: 'Worst Fish', content: 'I hate this fish', UserId: 5, ProductId: 1},
	    {rating: '2', title: 'Not a great fish', content: 'I dont like this fish very much', UserId: 1, ProductId: 3},
	    {rating: '3', title: 'Mixed Feelings', content: 'This fish is alright but not great', UserId: 2 , ProductId: 5},
	    {rating: '4', title: 'Very Dangerous', content: 'My fault for buying a shark', UserId: 5, ProductId: 6},
	    {rating: '5', title: 'Wonderful fish', content: 'I love this fish', UserId: 2, ProductId:1},
	    {rating: '1', title: 'Never received fish', content: 'I dont understand how the reviews work', UserId: 1, ProductId: 4},

   ],
   product_order: [
		{OrderId: 1, ProductId: 1, quantity: 1, price: 10.00},
		{OrderId: 2, ProductId: 1, quantity: 2, price: 57.50},
		{OrderId: 3, ProductId: 2, quantity: 1, price: 0.10},
		{OrderId: 4, ProductId: 2, quantity: 1, price: 0.10},
		{OrderId: 4, ProductId: 1, quantity: 1, price: 0.10},

   ]
};

  Orders.belongsToMany(Products, {through: 'Product_order'});
  Products.belongsToMany(Orders, {through: 'Product_order'});


	Products.belongsToMany(Users, {through: 'Cart'});
	Users.belongsToMany(Products, {through: 'Cart'});

	Users.hasMany(Reviews);
	Products.hasMany(Reviews);
	Reviews.belongsTo(Users);


	Users.hasMany(Orders);
	Orders.belongsTo(Users);



db.sync({force:true})
.then(function() {
  console.log("Dropped old data, now inserting data");
  const creatingUsers = Promise.map(data.users, function (user) {
    return Users.create(user);
  });
  return Promise.all(creatingUsers)
})
.then(function () {
  const creatingProducts = Promise.map(data.products, function (item) {
    return Products.create(item);
  })
  const creatingCarts = Promise.map(data.carts, function (item) {
    return Carts.create(item);
  })
  const creatingOrders = Promise.map(data.orders, function (item) {
    return Orders.create(item);
  })
  const creatingReviews = Promise.map(data.reviews, function (item) {
    return Reviews.create(item);
  })
  const creatingProduct_Orders = Promise.map(data.product_order, function (item) {
    return Product_Orders.create(item);
  })
    return Promise.all([creatingProducts, creatingOrders, creatingCarts, creatingReviews, creatingProduct_Orders
    ]);
})
.then(function () {
  console.log('Finished inserting data');
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
})
.finally(function () {
  db.close(); // creates but does not return a promise
  return null; // stops bluebird from complaining about un-returned promise
});
