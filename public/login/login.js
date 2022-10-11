const forms = document.querySelector(".forms");
const links = document.querySelectorAll(".link");
const myInput = document.getElementById("psw");
const uname = document.getElementById("username");
const psw = document.getElementById("psw");
const pswConf = document.getElementById("psw-conf");
const pswMatch = document.getElementById("psw-match");
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");
const signupForm = document.getElementById("signup");
const loginForm = document.getElementById("login")

links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        forms.classList.toggle("show-signup");
    })
})

myInput.onfocus = function() {
    document.getElementById("message").style.display = "block";
}

myInput.onblur = function() {
    document.getElementById("message").style.display = "none";
}

myInput.onkeyup = function() {
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const numbers = /[0-9]/g;

    if (myInput.value.match(lowerCase)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid")
    }

    if (myInput.value.match(upperCase)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    if (myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }

}

pswConf.onfocus = function() {
    document.getElementById("confirmation-match").style.display = "block";
}

pswConf.onblur = function() {
    document.getElementById("confirmation-match").style.display = "none";
}

pswConf.onkeyup = function() {
    if (myInput.value === pswConf.value) {
        pswMatch.classList.remove("invalid");
        pswMatch.classList.add("valid")
    } else {
        pswMatch.classList.remove('valid');
        pswMatch.classList.add('invalid');
    }
}

function signupSubmitHandler(e) {
    e.preventDefault()

    let username = document.querySelector('#signup-username')
    let password = document.querySelector('#psw')

    let bodyObj = {
        username: username.value,
        password: password.value
    }

    axios.post('/users/signup', bodyObj)
    .then(res => {
        localStorage.setItem('userId', res.data[0].user_id)
        window.location = '/main'
    })

}

function loginSubmitHandler(e) {
    e.preventDefault()

    let username = document.querySelector('#username')
    let password = document.querySelector('#login-psw')

    let bodyObj = {
        username: username.value,
        password: password.value
    }

    axios.post('/users/login', bodyObj)
    .then(res => {
        localStorage.setItem('userId', res.data[0].user_id)
        window.location = '/main'
    }).catch(err => alert('Invalid input.'))

}

signupForm.addEventListener('submit', signupSubmitHandler)
loginForm.addEventListener('submit', loginSubmitHandler)
