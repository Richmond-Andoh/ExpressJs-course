var express = require('express');
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
const request = require('request');
const db = require('../db');

var ensureLoggedIn = ensureLogIn();

function fetchTodos(req, res, next) {
  db.all('SELECT * FROM todos WHERE owner_id = ?', [
    req.user.id
  ], function(err, rows) {
    if (err) { return next(err); }
    
    var todos = rows.map(function(row) {
      return {
        id: row.id,
        title: row.title,
        completed: row.completed == 1 ? true : false,
        url: '/' + row.id
      }
    });
    res.locals.todos = todos;
    res.locals.activeCount = todos.filter(function(todo) { return !todo.completed; }).length;
    res.locals.completedCount = todos.length - res.locals.activeCount;
    next();
  });
}

var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if(!req.user){
    return res.render('home')
  } else{
    res.redirect('/')
  }
})

router.get('/dashboard', (req, res,) => {
    request('https://jsonplaceholder.typicode.com/todos', (error, response, body) => {
      let data = JSON.parse(body)
      res.render('dashboard', { data } )
    })
})

module.exports = router;
