var currentTime = new Date().getHours();
if (7 <= currentTime && currentTime < 20) {
    if (document.body) {
        document.body.background = "#FFF";
    }
}
else {
    if (document.body) {
        document.body.background = "#000";
    }
}