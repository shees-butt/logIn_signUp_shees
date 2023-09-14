// For Validation of form start
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
// For Validation of form end

// To store local storage start
window.onload = function () {

  if (typeof(Storage) !== "undefined") {

    document.getElementById('myForm').addEventListener('submit', function (event) {
      event.preventDefault();

      var name = document.getElementsByName('fname')[0].value;
      var email = document.getElementsByName('femail')[0].value;
      var phone = document.getElementsByName('fphone')[0].value;
      var pass = document.getElementsByName('fpass')[0].value;
      var image = document.getElementById('myFile').files[0];

      var reader = new FileReader();
      reader.onload = function() {
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('phone', phone);
        localStorage.setItem('pass', pass);
        localStorage.setItem('myFile', reader.result);
      };

      if (image) {
        reader.readAsDataURL(image);
      } else {
        localStorage.removeItem('myFile');
      }
    });

  } else {
    alert("localStorage is not supported in your browser.");
  }
}

// To store local storage end

// Hide & Unhide the password start
function passwordToggle() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

// Hide & Unhide the password end

// Capture the image from camera start

(function () {
  var width = 200;
  var height = 0;
  var streaming = false;
  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;
  var mediaStream = null;

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
      .then(function (stream) {
        video.srcObject = stream;
        mediaStream = stream;
        video.play();
      })
      .catch(function (err) {
        console.log("error occurred: " + err);
      });

    video.addEventListener('canplay', function (ev) {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

        if (isNaN(height)) {
          height = width / (4 / 3);
        }

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function (ev) {
      takepicture();
      ev.preventDefault();
    }, false);
  }

  function takepicture() {
    var context = canvas.getContext('2d');
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);

    // Save the image data to local storage
    try {
      localStorage.setItem('capturedImage', data);
      console.log('Image saved to local storage');
    } catch (error) {
      console.error('Error saving image to local storage:', error);
    }

    // Stop the camera after taking the picture.
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => {
        track.stop();
      });
    }
  }
}

  window.addEventListener('load', startup, false);
})();

// Capture the image from camera start