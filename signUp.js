function clearErrors() {

    errors = document.getElementsByClassName('formerror');
    for (let item of errors) {
        item.innerHTML = "";
    }

}
function seterror(id, error) {
    element = document.getElementById(id);
    element.getElementsByClassName('formerror')[0].innerHTML = error;

}

function validateForm() {
    var checkValid = true;
    clearErrors();

    var name = document.forms['myForm']["fname"].value;
    if (name.length < 10) {
        seterror("name", "*Length of name is too short");
        checkValid = false;
    }

    if (name.length == 0) {
        seterror("name", "*Length of name cannot be zero!");
        checkValid = false;
    }

    var email = document.forms['myForm']["femail"].value;
    if (email.length > 25) {
        seterror("email", "*Email length is too long");
        checkValid = false;
    }

    var phone = document.forms['myForm']["fphone"].value;
    if (phone.length != 11) {
        seterror("phone", "*Phone number should be of 11 digits!");
        checkValid = false;
    }

    var password = document.forms['myForm']["fpass"].value;
    if (password.length < 6) {
        seterror("pass", "*Password should be atleast 6 characters long!");
        checkValid = false;
    }

    var cpassword = document.forms['myForm']["fcpass"].value;
    if (cpassword != password) {
        seterror("cpass", "*Password and Confirm password should match!");
        checkValid = false;
    }

    return checkValid;
}

window.onload = function() {

    if (localStorage) {

      document.getElementById('myForm').addEventListener('submit', function() {
        var name = document.getElementById('sname').value;
        var name = document.getElementById('semail').value;
        var name = document.getElementById('sphone').value;
        var name = document.getElementById('spassword').value;

        localStorage.setItem('sname', name);
        localStorage.setItem('semail', name);
        localStorage.setItem('sphone', name);
        localStorage.setItem('spassword', name);
      });
  
    }
  
  }

  function passwordToggle() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  function passwordToggle() {
    var x = document.getElementById("passLogin");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }