// Skip the "app" actions if we're running in a browser
//
if(typeof app !== 'undefined') {
    runningInDroidScript = true;
    app.PreventScreenLock( true );
    app.SetScreenMode( "Full" );
}


$(function () {

    console.log("onload init");
    
    $(".actionbutton").click(function() {
        $(this).css({'background': 'yellow'});
        console.log("wut???");
        alert($(this).html());
    });

});