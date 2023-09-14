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

    function validateLoginForm() {
        var checkValid = true;
        clearErrors();

        var email = document.forms['myForm']["emailLogin"].value;
        if (email.length > 25) {
            seterror("email", "*Email length is too long");
            checkValid = false;
        }

        var password = document.forms['myForm']["fpassLoginpass"].value;
        if (password.length < 6) {
            seterror("pass", "*Password should be atleast 6 characters long!");
            checkValid = false;
        }

        return checkValid;
    }