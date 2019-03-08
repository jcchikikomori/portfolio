var currentTime = new Date().getHours();
if (7 <= currentTime && currentTime < 20) {
    $('body').css('background','#FFF');
} else {
    $('body').css('background','#23272a');
    // TODO: Use classes instead
    // $('.nes-container').css('background','#99aab5');
}