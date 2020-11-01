// const user = require("../../models/user");

$(document).ready(function () {
  // Getting references to our form and input
  // var signUpForm = $("form.signup");
  var fullName = $("input#fullName");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var birthday = $("input#dateofbirth");
  // When the signup button is clicked, we validate the email and password are not blank

  $("#signupbutton").on("click", function (event) {
    // prevent page from reloading
    event.preventDefault();
    // get user data
    if (passwordInput.val() !== $("#verifyPass").val()) {
      $("#verifyPass").val("");
      passwordInput.val("");
      return alert("Please enter the same password");
    }
    var userData = {
      // pulling emailInput from html 
      name: fullName.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      birthday: birthday.val()
    };
    console.log("userdata name:", userData.name);
    console.log(userData.birthday);
    // no email or password it will return empty
    if (!userData.name || !userData.email || !userData.password || !userData.birthday) {
      return alert("Please complete all fields");
    }


    // If we have an email and password, run the signUpUser function
    signUpUser(userData.name, userData.email, userData.password, userData.birthday);
    // empties text boxes for email and password
    fullName.val("");
    emailInput.val("");
    passwordInput.val("");
    birthday.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, email, password, birthday) {
    // makes post to db to add email and password
    $.post("/api/signup", {
      name: name,
      email: email,
      password: password,
      birthday: birthday
    })
      //then takes user to members.html
      .then(function (data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }
  $("#loginbutton").on("click", function (event) {
    event.preventDefault();
    console.log("testing")
    window.location.replace("/login");
  });
  // popup error if something goes wrong
  function handleLoginErr(err) {
    alert(JSON.stringify(err));
    // $("#alert .msg").text(err.responseJSON);
    // $("#alert").fadeIn(500);
  }
});