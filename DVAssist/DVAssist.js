eval( app.ReadFile( 'NetUtils.js' ) );
app.LoadScript( 'IO.js' );

var MESSAGES = {
    "Go!": "Сервис готов!",
    "Service started": "Сервис запущен",
    "Service stopped": "Сервис остановлен",
    "Retry please": "Повтори еще раз",
    "Interval changed": "Интервал обновления изменен"
};

function localStoreSettings( settings )
{
    storeSettings(
        {
            "login_name": login_name.GetText(),
            "login_password": login_password.GetText(),
            "autoboot": autoboot.GetChecked(),
            "refreshAfter": interval.GetText(),
            "dv": settings.dv
        }
    );
};

function OnStart()
{
    settings = loadSettings();
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );

    btn0= app.CreateButton( "Go to topic", 0.6, -1, "Custom" );
    btn0.SetStyle( "#ffa000", "#333300", 10 );
    btn0.SetTextShadow( 2, 0, 1, "#550000" );
    btn0.SetMargins( 0, 0, 0, 0 );
    lay.AddChild( btn0 );
    btn0.SetOnTouch( btn_OnDV);

    login_name = app.CreateTextEdit( settings.login_name, 0.6, 0.1 );
    login_name.SetHint( "Username" );
    login_name.SetMargins( 0, 0.05, 0, 0 );
    login_name.SetTextSize( 22 );
    if( settings.login_name == "" )
        lay.AddChild( login_name );

    login_password = app.CreateTextEdit ( settings.login_password, 0.6, 0.1 );
    login_password.SetHint( "Password" );
    login_password.SetMargins( 0, 0, 0, 0 );
    login_password.SetTextSize( 22 );
    if( settings.login_password == "" )
        lay.AddChild( login_password );

    btn1 = app.CreateButton( "Login", 0.6, -1, "Custom" );
    btn1.SetStyle( "#00a0ff", "#003333", 10 );
    btn1.SetTextShadow( 2, 0, 1, "#550000" );
    btn1.SetMargins( 0, 0, 0, 0 );
    lay.AddChild( btn1 );
    btn1.SetOnTouch( btn_OnLogin);
    
    btn2 = app.CreateButton( "Starting the service", 0.6, -1, "Custom" );
    btn2.SetStyle( "#ffa000", "#333300", 10 );
    btn2.SetTextShadow( 2, 0, 1, "#550000" );
    btn2.SetMargins( 0, 0, 0, 0 );
    lay.AddChild( btn2 );
    btn2.SetOnTouch( btn_OnStart);
    
    btn3 = app.CreateButton( "Stop service", 0.6, -1, "Custom" );
    btn3.SetStyle( "#00a0ff", "#003333", 10 );
    btn3.SetTextShadow( 2, 0, 1, "#550000" );
    btn3.SetMargins( 0, 0, 0, 0 );
    lay.AddChild( btn3 );
    btn3.SetOnTouch( btn_OnStop);
      
    app.AddLayout( lay );
    
    svc = app.CreateService( "this", "this", OnServiceReady );
    svc.SetOnMessage( OnServiceMessage );

    autoboot = app.CreateCheckBox( "Autostart service" );
    autoboot.SetMargins( 0, 0.02, 0, 0 );
    autoboot.SetOnTouch( btn_OnAutoboot );
    autoboot.SetChecked( settings.autoboot );
    lay.AddChild( autoboot );
    var intervals = settings.refreshAfter + ",";
    for( i in INTERVALS )
    {
       if( i != settings.refreshAfter )
           intervals += i + ",";
    };
    interval = app.CreateSpinner( intervals,  0.6 );
    interval.SetOnTouch( interval_OnChange );
    lay.AddChild( interval );
    localStoreSettings( settings );
    if( LOGGED_IN )
        svc.SendMessage( "start" );
};

function OnServiceReady()
{
    app.ShowPopup( "Service is being prepared" );
};

function OnServiceMessage( msg )
{
    if( MESSAGES[msg] !== undefined )
        msg = MESSAGES[msg];
    app.ShowPopup( msg );
};

function btn_OnStop()
{
    svc.SendMessage( "stop" );
    svc.Stop();
    lay.RemoveChild( btn1 );
    lay.RemoveChild( btn2 );
    lay.RemoveChild( btn3 );
};

function btn_OnDV()
{
    app.OpenUrl( THEME_URL );
};

function btn_OnLogin()
{
    if( LOGGED_IN )
        return;
    app.ShowProgress( "Authorization" );
    try
    {
        var authCode = auth( login_name.GetText(), login_password.GetText() );
    }
    catch( err )
    {
        app.ShowPopup( "Network error\n" + err.message );
        app.HideProgress();
        return;
    };
    if( authCode === true )
    {
        app.HideProgress();
        lay.SetBackColor( "#deadbeef" );
        localStoreSettings( settings );
        lay.RemoveChild( login_name );
        lay.RemoveChild( login_password );
        lay.RemoveChild( btn1 );
    }
    else
    {
        app.HideProgress();
        app.ShowPopup( "Try again. You may have entered an incorrect username and / or password" );
    };
};

function btn_OnAutoboot( isChecked )
{
    if( isChecked === true )
    {
        app.SetAutoBoot( "Service" );
         app.ShowPopup( "Service successfully added to startup" );
    }
    else
    {
        app.SetAutoBoot( "none" );
        app.ShowPopup( "Service successfully deleted from startup" );
    };
    localStoreSettings( settings );
};

function interval_OnChange( item )
{
    settings.refreshAfter = item;
    localStoreSettings( settings );
    svc.SendMessage( "interval:" + item );
};

function btn_OnStart()
{
    if( LOGGED_IN )
        svc.SendMessage( "start" )
    else
        app.ShowPopup( "Please log in" );
};
