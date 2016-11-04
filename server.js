
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

//functions
function generateRandomString() {
  // http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
  return Math.random().toString(36).substring(2,8);
}

//configs
app.set('port', process.env.PORT || 8080); // default port 8080
app.set("view engine", "ejs");


const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
//middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

//routes//////////////////
//route for homepage
app.get('/', (req, res) => {
  let templateVars = {
    username: req.cookies.username,
  };
  res.render('home', templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});
//route for page where you see your urls, short and long
app.get("/urls", (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    username: req.cookies.username,
  };
  res.render("urls_index", templateVars);
});
//route for where you can enter in a new url
app.get("/urls/new", (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    username: req.cookies.username,
  };
  res.render("urls_new", templateVars)
});

app.get("/urls/:id", (req, res) => {
  let templateVars = {
    shortURL: req.params.id,
    username: req.cookies.username,
  };
  res.render("urls_view", templateVars);
});

app.post("/u", (req, res) => {
  urlDatabase[generateRandomString()] = req.body.longURL
  console.log(req.body.longURL);
  res.redirect("/urls");
});
//delete route////
app.post('/urls/:id/delete', (req,res) => {
  delete urlDatabase[req.params.id];
  res.redirect("/urls");
});
/////edit route/////
app.post('/url_edit/:id', (req,res) => {
  //console.log("/url_edit/:id entered with :id = req.params.id = ", req.params.id);
  //console.log("/url_edit/:id entered with longURL = urlDatabase[req.params.id]", urlDatabase[req.params.id]);
  //console.log("is this this input value of the edit form?=",req.body.new_long_url)
  urlDatabase[req.params.id] = "http://" + req.body.new_long_url;
  //console.log("urlDatabase=", urlDatabase);
  res.redirect("/urls");
});

///sortofdatabase///
app.get("/u/:id", (req, res) => {
  let shortURL = req.params.id;
  // console.log("/u/:id shortURL=", shortURL);
  // console.log("/u/:id urlDatabase=", urlDatabase);
  // console.log("/u/:id longURL=", urlDatabase[shortURL]);
  res.redirect(urlDatabase[shortURL]);
});
///login route///
app.post("/login", (req, res) => {
  res.cookie("username", req.body.username)
  res.redirect('/');
});
///logout route////
app.post("/logout", (req, res) => {
  res.clearCookie("username")
  res.redirect("/")
});

app.listen(app.get('port'), () => {
  console.log("let's go!");
});
