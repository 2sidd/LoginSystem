var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register1', function(req, res) {

    res.send('respond with a resource from register');

});
router.post('/login1', function(req, res) {
    res.send('respond with a resource from login');


});

module.exports = router;
