const express = require('express');
const stripe = require('stripe')('sk_test_DufAALPfasIZBCq3Za4u8mUB');
const router = express.Router();

router.use(function timeLog (req, res, next) {
  console.log('Time payment: ', Date.now())
  next();
});

const chargeStripe = (callback) => {
  stripe.charges.create({
    amount: 1000, //amount * 100
    currency: 'usd',
    source: 'tok_amex', //stripeTokenCard
    description: 'My First Test Charge'
  }, (err, charge) => {
    callback(err, charge)
  });
}

router.get('/', async (req, res)=>{

  await chargeStripe( (error, charge)=> {
    res
    .status(200)
    .json({error, charge})
  });
});



module.exports = router;

/*
Publishable key -> pk_test_pISb2Oa5ruD40gLYMXwy5CU7

Secret key -> sk_test_DufAALPfasIZBCq3Za4u8mUB
*/
/*

// Create a new customer and then a new charge for that customer:
stripe.customers
  .create({
    email: 'foo-customer@example.com',
  })
  .then((customer) => {
    return stripe.customers.createSource(customer.id, {
      source: 'tok_visa',
    });
  })
  .then((source) => {
    return stripe.charges.create({
      amount: 1600,
      currency: 'usd',
      customer: source.customer,
    });
  })
  .then((charge) => {
    // New charge created on a new customer
  })
  .catch((err) => {
    // Deal with an error
  });
  
*/