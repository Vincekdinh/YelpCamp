var express = require("express");
var router	= express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/", function(req, res){
	res.render("landing");
})	

//show register form
router.get("/register", function(req,res){
	res.render("register");
});

//handle sign up logic
router.post("/register", function(req,res){
	// res.send("Signing you up...")
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Hi " + user.username + ", we are pleased to have you :)");
			res.redirect("/campgrounds");
		});
	});
});

//show login form
router.get("/login", function(req, res){
	res.render("login");
});

//handling login logic
//formula: app.post("./login", middleware, callback)
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req,res){
	// res.send("Login logic happens here...")
})

//logout route
router.get("/logout", function(req,res){
	// res.send("LOGOUT PAGE...")
	req.logout();
	req.flash("success", "You logged out. Come back again!")
	res.redirect("/campgrounds");
})

module.exports = router;

