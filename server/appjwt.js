var express    = require("express");
var bodyParser = require("body-parser");
var expressJwt = require("express-jwt");
var jwt        = require("jsonwebtoken");
var shortid    = require("shortid");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressJwt({secret: "secret"}).unless({path: ["/login"]}));
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token");
  }
});


app.post("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username) {
    return res.status(400).send("username require");
  }
  if (!password) {
    return res.status(400).send("password require");
  }

  // if (username != "admin" && password != "password") {
  //   return res.status(401).send("invaild password");
  // }


  // jwt.verify(token, 'secret', function(err, decoded) {
  //   if (err) { // it should
  //     if (err.name == 'Error' && err.message == 'jwt expired') { // paranoid mode
  //       // if decoded payloads needed : old_payloads = jwt.decode(token);
  //       // now you can check user, permissions, .... and serve a new token
  //       new_token = jwt.sign({ iss: old_payloads.iss}, 'secret', {expiresInMinutes: 60});
  //       res.json({token:new_token});
  //     }
  //   }
  var authToken = jwt.sign({uid: username, iat: Date.now()}, "secret",  {expiresIn: '7d'});
  res.status(200).json({token: authToken});

});

app.post("/user", function (req, res) {
  res.status(200).json(req.user)
});

app.listen(3008);