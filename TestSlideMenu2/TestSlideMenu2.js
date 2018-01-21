var menuIntervalId;
var BTNCOLOR = "#F99999";

function OnStart () {
	layout = app.CreateLayout( "Linear", "VCenter,FillXY" );
	var btn = app.CreateButton( "Menu" );
	btn.SetOnTouch( openMenu );
	layout.AddChild( btn );
	app.AddLayout ( layout );
	createMenu();
}

function createMenu () {
	// Боковое меню.
	layMenu = app.CreateLayout( "Linear", "VLeft,FillXY" );

	layMenu.scrollers = [];
	layMenu.layouts = [];

	var rows = 9, rowHeight = 1 / 10, btn;
	for (var i = 0; i < rows; i++) {
		var scroller = app.CreateScroller( 1, rowHeight );
		var lay = app.CreateLayout( "Linear", "Left,Bottom,Horizontal,FillX" );
		lay.SetSize( 2, 1 );
		layMenu.layouts.push( lay );
		scroller.AddChild( lay );
		layMenu.AddChild( scroller )
		layMenu.scrollers.push( scroller );

		for( var j = 0; j < 4; j++) {
			btn = app.CreateText( i.toString() + j.toString(), 0.5-0.01, rowHeight-0.006);
			btn.SetBackColor(BTNCOLOR);
			btn.SetMargins(0.01, 0, 0, 0);
			btn.SetPadding(0.01, (rowHeight-0.01) / 2 - 7 / app.GetScreenHeight(), 0.01, 0)
			btn.SetOnTouch( _OnTouch );
			lay.AddChild( btn );
		};
	};

	layControl = app.CreateLayout( "Linear", "Left,Horizontal,FillX" );
	btn = app.CreateButton( "< Back", 0.2, rowHeight, "Custom" );
	btn.SetStyle( "#FF7014A1", "#FF7014A1", 4 );
	btn.SetOnTouch( hideMenu );
	layControl.AddChild( btn );

	scroll = app.CreateScroller( 0.8, rowHeight );
	scroll.pos = 0;
	lay = app.CreateLayout( "Linear", "Left,Bottom,Horizontal,FillX" );
	lay.SetSize( 2, -1 );
	scroll.AddChild( lay );
	layControl.AddChild( scroll );

	layMenu.AddChild( layControl );

	layMenu.SetVisibility( "Hide" );
	app.AddLayout( layMenu );
}

function onBtnTouch (text) {
	hideMenu();
	app.ShowPopup(text);
}

function openMenu () {
	layout.Animate( "SlideToLeft" );
	layMenu.Animate( "SlideFromRight" );
	menuIntervalId = setInterval( menuWatcher, 50 );
}

function hideMenu () {
	layMenu.Animate( "SlideToRight" );
	layout.Animate( "SlideFromLeft" );
	clearInterval ( menuIntervalId );
}

function menuWatcher () {
	var rows = layMenu.scrollers.length;
	var pos = scroll.GetScrollX();
	if( pos == scroll.pos )
		return;
	else
		scroll.pos = pos;
	for( i=0; i < rows; i++ ) {
		layMenu.scrollers[i].ScrollTo( pos * ( 2 / 0.8 ) );
	};
};


function _OnTouch(ev) {
    if (ev.action == "Down") {
        this.time = new Date().getTime();
        this.X = ev.X;
        this.flag = true;
        this.col = false;
    }
    else if (ev.action == "Move") {
        if (!this.flag) return;
        if (ev.X != this.X) {
            this.flag = false;
            if (this.col) {
                this.SetBackColor(BTNCOLOR);
                this.col = false;
            }
            return;
        }
        var t = new Date().getTime() - this.time;
        if (t > 150) {
            if (!this.col) {
                this.col = true;
                this.SetBackColor("#ff8800");
            }
        }
        if (t > 800) {
            this.SetBackColor(BTNCOLOR);
            this.col = false;
            this.flag = false;
            app.ShowPopup("LongTouch");
        }
    }
    else if (ev.action == 'Up') {
        if (this.flag) {
            if (!this.col) 
                this.SetBackColor("#ff8800");
            app.Wait(0.05);
            this.SetBackColor(BTNCOLOR);
            onBtnTouch(this.GetText());
        }
    }
}






// tab = 4
