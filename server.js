


var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080; // default port 8080

//functions
function generateRandomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

app.set("view engine", "ejs");

//middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//routes
//route for homepage
app.get('/', (req, res) => {
  res.render('home');
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});


app.get("/urls", (req, res) => {
  let templateVars = {
    urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id };
  res.render("urls_view", templateVars);
});



app.post("/urls", (req, res) => {
  urlDatabase[generateRandomString()] = req.body.longURL
  console.log(req.body.longURL);
  res.redirect("/urls");
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
