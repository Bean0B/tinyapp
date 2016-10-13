//require express
const express = require('express');
const path    = require('path');
//create router object
const router = express.Router()

//export router
module.exports = router;

//route for homepage
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
});

//route for about page
router.get('/about', (req, res) => {
  res.send('about page is here');
});

router.get('/contact');
router.post('/contact');