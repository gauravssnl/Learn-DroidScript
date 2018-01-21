app.LoadScript( 'NetUtils.js' );
app.LoadScript( 'IO.js' );

var timerId;

function OnStart()
{
    settings = loadSettings();
    notify = app.CreateNotification( "AutoCancel" );
    notify.SetLargeImage( "Img/DVAssist.png" );
    guard = app.CreateNotification( "Ongoing" );
    guard.SetLargeImage( "Img/DVAssist.png" );
    app.SendMessage( "Go!" );
    if( settings.autoboot && settings.login_name && settings.login_password )
        OnMessage( "start" );
};

function OnMessage( msg )
{
    if( msg == "start" )
    {
        settings = loadSettings();
        try
        {
            isAuth = auth( settings.login_name, settings.login_password );
        }
        catch( err )
        {
            if( settings.autoboot && settings.login_name && settings.login_password )
               timerId = setInterval( function() { OnMessage( "start" ); }, 60000 );
            return;
        };
        if( isAuth )
        {
            app.SendMessage( "Service started" );
            guard.SetMessage(   "DV", "DVAssist", "DVAssist работает" );
            guard.Notify( "dvassist" );
            UpdateApp();
            timerId = setInterval( UpdateApp, INTERVALS[settings.refreshAfter] );
        }
        else
            app.SendMessage( "Retry please" );
    }
    else if( msg == "stop" )
    {
        app.SendMessage( "Service stopped" );
        guard.Cancel( "dvassist" );
        guard.Cancel();
        notify.Cancel( "dv" );
        notify.Cancel();
    }
    else if( msg.split( ":" )[0] == "interval" )
    {
        if( LOGGED_IN )
        {
            clearInterval( timerId );
            settings = loadSettings();
            timerId = setInterval( UpdateApp, INTERVALS[settings.refreshAfter] );
        };
        app.SendMessage( "Interval changed" );
    };
};

function checkNewPosts( httpRequest )
{
    if( httpRequest.readyState == 4 ) 
    {
        if( httpRequest.status == 200 )
        {
            data = httpRequest.responseText;
            posts = data.match( /posts="(\d+)"/ )[1];
            last_poster_name = data.match( /last_poster_name="(\w+)"/ )[1];
            last_post = data.match( /last_post="(\d+)"/ )[1];
            new_posts = posts - settings.dv.posts;
            settings.dv.posts = posts;
            settings.dv.last_poster_name = last_poster_name;
            settings.dv.last_post = last_post;
            storeSettings( settings );
            now = new Date();
            notify.SetMessage( "DV", now.toTimeString().split( " " )[0], "новых: " + new_posts.toString() + " | посл.: " + last_poster_name );
            notify.Notify( "dv" );
            if( new_posts == 0 )
            {
                API( 1,  checkChangingOfLastPosts, ( 20 * Math.floor( posts / 20 ).toString() ) );
            };
        };
    };
};

function checkChangingOfLastPosts( httpRequest )
{
    if( httpRequest.readyState == 4 ) 
    {
        if( httpRequest.status == 200 )
        {
            data = httpRequest.responseText;
            last_hash = CRYPT.Hash( data, "MD5");
            if( settings.dv.last_hash == undefined )
                settings.dv.last_hash = last_hash
            else
            {
                if( settings.dv.last_hash != last_hash )
                {
                    now = new Date();
                    notify.SetMessage( "DV", now.toTimeString().split( " " )[0], "изменены комментарии!" );
                    notify.Notify( "dv" );
                };
            };
            storeSettings( settings );
        };
    };
};

function UpdateApp()
{
    API( 0, checkNewPosts );
};
