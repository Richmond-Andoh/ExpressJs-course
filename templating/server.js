const express = require('express');
const { engine } = require('express-handlebars');
const request = require('request');
const app = express();
const PORT = 2500;

app.use(express.static('public'))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get("/", (req, res) => {
    request('https://jsonplaceholder.typicode.com/todos', (error, response, body) => {
        let data = JSON.parse(body);
        res.render("home", { data })
    });
});




app.listen(PORT, () => console.log(`Listening to port ${PORT}`))