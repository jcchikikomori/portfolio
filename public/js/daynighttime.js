var currentTime = new Date().getHours();
if (7 <= currentTime && currentTime < 20) {
    $('body').css('background','#FFF');
} else {
    $('body').css('background','#000');
}