// ADD NEW ITEM TO END OF LIST
// Reference: http://stackoverflow.com/questions/20673959/how-to-add-new-li-to-ul-onclick-with-javascript
var ul = document.getElementsByTagName("ul")[0];
var liAppend = document.createElement("li");
liAppend.appendChild(document.createTextNode("cream"));
ul.appendChild(liAppend);

// ADD NEW ITEM START OF LIST
// Reference: http://forums.macrumors.com/threads/insert-list-item-with-javascript.646407/
var liInsert = document.createElement("li");
liInsert.appendChild(document.createTextNode("kale"));
ul.insertBefore(liInsert, document.getElementById("one"));

// ADD A CLASS OF COOL TO ALL LIST ITEMS
// Reference: Class Slides
var liSetClasses = document.getElementsByTagName("li");
for (var i = 0; i < liSetClasses.length; ++i) {
    liSetClasses[i].setAttribute("class", "cool");
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
// Reference: Class slides
var h2 = document.getElementsByTagName("h2")[0];
h2.innerHTML = h2.innerHTML + " (" + liSetClasses.length + ")";
