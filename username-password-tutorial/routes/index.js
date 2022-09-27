var express = require('express');
const request = require('request');

var router = express.Router()

router.get('/', (req, res) => {
    request('https://jsonplaceholder.typicode.com/todos', (error, response, body) => {
      let data = JSON.parse(body)
      res.render('dashboard', { data } )
    })
})

module.exports = router;
