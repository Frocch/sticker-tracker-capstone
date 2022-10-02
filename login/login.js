const forms = document.querySelector(".forms");
const links = document.querySelectorAll(".link");
const uname = document.getElementById("username");
const psw = document.getElementById("psw");
const pswConf = document.getElementById("psw-conf");


links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        forms.classList.toggle("show-signup");
    })
})

// function createPass () {
//     const passPattern = 
// }
