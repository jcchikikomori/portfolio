
var thediv=document.getElementById('date_and_time');
document.write ('<span id="date-time" style="color:white;">', new Date().toLocaleString(), '</span>')
if (document.getElementById) onload = function () {
	setInterval ("document.getElementById ('date-time').firstChild.data = new Date().toLocaleString()", 50)
}