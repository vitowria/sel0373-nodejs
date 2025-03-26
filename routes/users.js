const express = require("express")
const router = express.Router()


//router.get("/", (req, res) => {
  //console.log(req.query.name)
  //res.send("User List")
//})

router.get("/new", (req, res) => {
  res.render("/register")
})

router.get("/login",(req, res)=>{
  res.render("/login")
})
router.post('/', (req, res, next) => {
  // The data sent from the user are stored in the req.body object.
  // call our login function and it will return the result(the user data).
  user.login(req.body.username, req.body.password, function(result) {
      if(result) {
          // Store the user data in a session.
          req.session.user = result;
          req.session.opp = 1;
          // redirect the user to the home page.
          res.redirect('/home');
      }else {
          // if the login function returns null send this error message back to the user.
          res.send('Username/Password incorrect!');
      }
  })

});



module.exports = router