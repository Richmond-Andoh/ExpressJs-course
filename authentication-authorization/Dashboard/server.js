const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");
const request = require("request");
const User = require('./user.js');

const app = express();

app.use(session( {
    secret: "mouse button",
    resave: false,
    saveUninitialized: true,
    //cookie: { maxAge: 1000 * 60 * 60 * 8 } // 8 hours
}))

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session())

// Passport local strategy
passport.use(User.createStrategy());

// To use session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Route to home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

// Handle request
// app.get("/", (req, res) => {
//     request('https://jsonplaceholder.typicode.com/todos', (error, response, body) => {
//         let data = JSON.parse(body);
//         res.render("user-dashboard", { data })
//     });
// });

// Route to login page
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
})

// Post Route: /login
app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), function(req, res) {
    console.log(req.user)
    res.redirect('/dashboard');
});

//Route to Dashboard
app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html')
});

//Route to user-dashboard/ Secret page
app.get('/user-dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res,) => {
    res.sendFile(__dirname + "/public/user-dashboard.html")
 })

// Route to signup page
app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/public/signup.html")
})

// Route to Log out
app.get('/logout', function(req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});



const PORT = process.env.PORT || 5500

app.listen(PORT, console.log(`http://localhost:${PORT}`))