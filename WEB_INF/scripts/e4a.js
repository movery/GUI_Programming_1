var hourOfDay = new Date().getHours();

var greeting;

if (hourOfDay > 18) 
    greeting = "Good Evening!";
else if (hourOfDay > 12) 
    greeting = "Good Afternoon!";
else if (hourOfDay > 0) 
    greeting = "Good Morning!";
else 
    greeting = "Welcome!"

document.write('<h3>' + greeting + '</h3>');

