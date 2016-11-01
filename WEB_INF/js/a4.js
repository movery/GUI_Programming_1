/*
  Name: Michael Overy
  Email: michael_overy@student.uml.edu
  Affiliation: Senior Undergraduate
  Creation Date: 29 September 2016
  Description: Refactor the previous webpage created in assignment 2. Use
               external CSS to style the page. Ensure that the page passes W3C
               standards.
*/

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
    }
}
