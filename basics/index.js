const express = require("express")
//const serveIndex = require("serve-index")
const app = express();
const port = 8000;

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"},
    {id: 4, name: "course4"}
]

app.use("/public", express.static('public'))
//app.use("/public", serveIndex('public'))

app.get("/courses/:id", (req, res) => {
  res.send(parseInt(courses.id))
})

app.get("/todos", (req, res) => {
    res.send("todos")
})

app.post("/todos", (req, res) => {
    res.send("Post method")
})

app.get("/todos/:id", (req, res) => {
    res.send('18212729')
})

app.put("/todos/:id", (req, res) => {
    res.send("192193293")
})

app.delete("/todos/:id", (req, res) => {
    res.send("230128u3081")
})

app.use('/request-type', (req, res, next) => {
    console.log('Request type: ', req.method);
    next();
  });
  
app.listen(port, console.log('Server is listening on Port 8000'))