const express = require('express')
const app = express()

const logName = function (req, res, next) {
    req.name = "Richmond";
   next()
  }
const details = (req, res, next) => {
    req.userDetails = [
        {id: 1, name: "Richmond"},
        {id: 2, name: "Samuel"},
        {id: 3, name: "Bismark"},
    ]

    next()
}
app.use(logName);
app.use(details);

app.get('/name', (req, res) => {
  res.send(req.name)
})

app.get("/details", (req, res) => {
    res.send(req.details)
})
app.listen(1500)
