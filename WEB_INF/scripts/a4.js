// http://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_accordion_symbol -->

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
    }
}
