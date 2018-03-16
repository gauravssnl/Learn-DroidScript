/*: 
TO DO (ideas)
- enable back button
- style folder/file list
- offset lrc
- options btn and layout
- user and app files separated
- on showed scroller adapt laybottom
- font size btn
- bg not perceived
- resume playing for longer files, option
- more beautiful presentation of lyrics
- visualization like winamp viz
- color as bg
- slideshow folder images as bg
- video playing as bg
- show icon in filelist of lrc disponibility
- duplicate one side if is only one side audio
- resolve bug not showing lyrics or stopped
- lyric position: top, bottom, left, top left, etc
- move bg btn
- close scroller btn
*/
var o = {
	lay1: {
		main: null,
		top: null
	},
	lay2: {
		main: null,
		bg : null,
		lyrics: null,
		top: null,
		bottom: null,
		time: null,
		play: null,
		// of btns
		photo: null,
		font: null,
		color: null,
		options: null,
		//
		d1: null,
		d2: null
	},
	txt: {
		dir: null,
		bg: null,
		title: null,
		lyrics: null,
		posTime: null,
		durTime: null
	},
	skb: {
		time: null,
		vol: null
	},
	btn: {
		pins: null,
		play: null,
		back: null,
		nav: null
		//nav buttons are anonymous
	},
	img: {
		line: null,
		bg: null,
		bgTmp : null
	},
	imgs: {
		bg: []
	},
	list: {
		files: null
	},
	scroller: {
		photo: null,
		font: null,
		color: null,
		options: null
	},
	drawer: {
		d1: null,
		d2: null
	}
};
var create = {
	lay1: {
		main: function() {
			o.lay1.main = app.CreateLayout("Linear", "Vertical,FillX");
			o.lay1.main.SetBackColor("#555555");
			o.lay1.main.SetSize(1, 1);
		},
		top: function() {
			o.lay1.top = app.CreateLayout("Linear", "Horizontal, VCenter,FillX");
			o.lay1.top.SetSize(1, 0.12);
			o.lay1.top.SetBackColor("#333333");
			o.lay1.main.AddChild(o.lay1.top);
		}
	},
	lay2: {
		main: function() {
			o.lay2.main = app.CreateLayout("Absolute", "");
			o.lay2.main.SetVisibility("Hide");
		},
		bg: function() {
			o.lay2.bg = app.CreateLayout("Linear", "VCenter, FillXY");
			o.lay2.bg.SetSize(1, 1);
			o.lay2.main.AddChild(o.lay2.bg);
		},
		lyrics: function() {
			o.lay2.lyrics = app.CreateLayout("Linear", "VCenter, FillXY");
			o.lay2.lyrics.SetSize(1, 1);
			o.lay2.lyrics.SetVisibility("Hide");
			o.lay2.main.AddChild(o.lay2.lyrics);
		},
		top: function() {
			o.lay2.top = app.CreateLayout("Linear", "Horizontal, VCenter, FillXY");
			o.lay2.top.SetSize(1, 0.12);
			o.lay2.top.SetBackColor("#66000000");
			o.lay2.main.AddChild(o.lay2.top);
		},
		btns: function () {
			o.lay2.btns = app.CreateLayout( "Linear", "Horizontal, Right" );
			o.lay2.btns.SetBackColor("#66000000");
			o.lay2.btns.SetSize(1, 0.1);
			o.lay2.btns.SetPosition( 0, 0.12 );
			o.lay2.btns.SetVisibility("Gone");
			o.lay2.main.AddChild(o.lay2.btns);
		},
		bottom: function() {
			o.lay2.bottom = app.CreateLayout("Linear", "Vertical");
			o.lay2.bottom.SetBackColor("#66000000");
			o.lay2.bottom.SetSize(1, -1);
			o.lay2.bottom.SetVisibility("Hide");
			o.lay2.main.AddChild(o.lay2.bottom);
		},
		time: function() {
			o.lay2.time = app.CreateLayout("Linear", "Horizontal,FillX");
			o.lay2.bottom.AddChild(o.lay2.time);
		},
		play: function() {
			o.lay2.play = app.CreateLayout("Linear", "Horizontal,VCenter");
			o.lay2.play.SetPadding(0, 0.01, 0, 0);
			o.lay2.bottom.AddChild(o.lay2.play);
		}
	},
	txt: {
		dir: function() {
			o.txt.dir = app.CreateText("[fa-folder]  /", 0.64, -1, "Left, FontAwesome");
			o.txt.dir.SetTextSize(22);
			o.txt.dir.SetEllipsize('end');
			o.txt.dir.SetPadding(0.02, 0.02, 0.02, 0.02);
			o.lay1.top.AddChild(o.txt.dir);
		},
		bg: function() {
			o.txt.bg = app.CreateText("", 0.9, 1, "");
			o.txt.bg.SetPosition(0.05, 0);
			o.txt.bg.SetOnTouchDown(lyrics_OnTouch);
			//o.txt.bg.SetBackColor( "#cc22cc" );
			o.lay2.main.AddChild(o.txt.bg);
		},
		title: function() {
			o.txt.title = app.CreateText("", 0.6, 0.12, "Multiline, AutoScale");
			o.txt.title.SetTextSize(20);
			o.txt.title.SetTextColor("#999999");
			//o.txt.title.SetTextShadow(5, 0.5, 0.5, '#222222' );
			o.lay2.top.AddChild(o.txt.title);
		},
		lyrics: function() {
			o.txt.lyrics = app.CreateText("", 0.9, -1, "Multiline");
			o.txt.lyrics.SetTextSize(40);
			o.txt.lyrics.SetTextColor("#222222");
			o.txt.lyrics.SetFontFile('fonts/Overlock-Regular.ttf');
			o.lay2.lyrics.AddChild(o.txt.lyrics);
		},
		posTime: function() {
			o.txt.posTime = app.CreateText("", 0.45, -1, "Left");
			o.txt.posTime.SetTextSize(16);
			o.lay2.time.AddChild(o.txt.posTime);
		},
		durTime: function() {
			o.txt.durTime = app.CreateText("", 0.45, -1, "Right");
			o.txt.durTime.SetTextSize(16);
			o.lay2.time.AddChild(o.txt.durTime);
		}
	},
	skb: {
		time: function() {
			o.skb.time = app.CreateSeekBar(0.95, -1);
			o.skb.time.SetRange(1.0);
			o.skb.time.SetOnTouch(skb_OnTouch)
				//o.skb.time.SetBackColor( "#222226" );;
			o.lay2.bottom.AddChild(o.skb.time);
		},
		vol: function() {
			o.skb.vol = app.CreateSeekBar(0.66, -1);
			o.skb.vol.SetMargins(0.03, 0, 0, 0);
			o.skb.vol.SetOnTouch(skbVol_OnTouch);
			o.skb.vol.SetRange(1.0);
			o.skb.vol.SetValue(0.5);
			o.lay2.play.AddChild(o.skb.vol);
		}
	},
	btn: {
		pins: function() {
			o.btn.pins = app.CreateButton("[fa-thumb-tack]", 0.18, -1, "FontAwesome");
			o.btn.pins.SetVisibility('Hide');
			o.btn.pins.SetTextSize(26);
			o.btn.pins.SetTextColor("#222633");
			o.btn.pins.SetOnTouch(btnPins_OnTouch);
			o.lay1.top.AddChild(o.btn.pins);
		},
		play: function() {
			o.btn.play = app.CreateButton("[fa-play]", -1, -1, "FontAwesome,Custom");
			styleBtn(o.btn.play);
			o.btn.play.SetTextSize(40);
			o.btn.play.SetPadding(0.05, 0.02, 0.05, 0.03)
			o.btn.play.SetOnTouch(btnPlay_OnTouch);
			o.lay2.play.AddChild(o.btn.play);
		},
		go: function() {
			o.btn.go = app.CreateButton("[fa-chevron-right]", -1, -1, "FontAwesome, Custom");
			styleBtn(o.btn.go);
			o.btn.go.SetTextSize(27);
			o.btn.go.SetVisibility('Hide');
			o.btn.go.SetPadding(0.04, 0.02, 0.03, 0.03);
			o.btn.go.SetMargins(0, 0.01, 0, 0);
			o.btn.go.SetOnTouch(btnGo_OnTouch);
			o.lay1.top.AddChild(o.btn.go);
		},
		back: function() {
			o.btn.back = app.CreateButton("[fa-chevron-left]", 0.18, -1, "FontAwesome, Custom");
			styleBtn(o.btn.back);
			o.btn.back.SetTextSize(26);
			o.btn.back.SetPadding(0, 0.02, 0.01, 0.03);
			o.btn.back.SetOnTouch(btnBack_OnTouch);
			o.lay2.top.AddChild(o.btn.back);
		},
		nav : function () {
			o.btn.nav = app.CreateButton("[fa-navicon]", 0.18, -1, "FontAwesome, Custom");
			styleBtn(o.btn.nav);
			o.btn.nav.SetTextSize(26);
			o.btn.nav.SetPadding(0, 0.02, 0, 0.03);
			o.btn.nav.SetOnTouch(btnNav_OnTouch);
			o.lay2.top.AddChild(o.btn.nav);
		},
		navBtns: function () {
			createNavBtn("photo", btnPhoto_OnTouch);
			createNavBtn("font", btnFont_OnTouch);
			createNavBtn("paint-brush", btnColor_OnTouch);
			createNavBtn("text-height", btnFontSize_OnTouch);
			createNavBtn("th", btnPosition_OnTouch);
			createNavBtn("cog", btnOptions_OnTouch);
		}
	},
	img: {
		line: function() {
			o.img.line = app.CreateImage(null, 1, 0.008);
			o.lay1.main.AddChild(o.img.line);
			o.img.line.SetColor("#6688ff");
		},
		bg: function() {
			o.lay2.bg.DestroyChild( o.img.bg );
			o.img.bg = app.CreateImage(bg.path, 1, -1);
			o.img.bg.SetVisibility( 'Hide' );
			o.lay2.bg.AddChild(o.img.bg);
			bg.center();
		},
	},
	list: {
		files: function() {
			o.list.files = app.CreateList('', 1, 1);
			o.list.files.SetFontFile( 'fonts/Overlock-Regular.ttf' );
			o.list.files.SetTextSize(20);
			o.list.files.SetOnTouch(listFiles_OnTouch);
			o.list.files.SetOnLongTouch(listFiles_OnLongTouch);
			o.list.files.SetVisibility('Hide');
			o.lay1.main.AddChild(o.list.files);
		}
	},
	scroller: {
		photo: function () {
			o.scroller.photo = app.CreateScroller(1, 0.3);
			o.scroller.photo.SetPosition( 0, 0.705 );
			o.scroller.photo.SetVisibility('Gone' );
			o.scroller.photo.SetBackColor("#66000000");
			o.lay2.main.AddChild(o.scroller.photo );
		},
		font: function () {
			o.scroller.font = app.CreateScroller(1, 0.3);
			o.scroller.font.SetPosition( 0, 0.705 );
			o.scroller.font.SetVisibility('Gone' );
			o.scroller.font.SetBackColor("#66000000");
			o.lay2.main.AddChild(o.scroller.font );
		},
		color: function () {
			var addColor  = function (color) {
				var img = app.CreateImage( null, 0.2, 0.2*app.GetDisplayWidth()/app.GetDisplayHeight()  );
				img.SetColor( color );
				img.SetMargins( 0.01, 0.01, 0.01, 0.01 );
				img.SetOnTouchUp( function () {
					o.txt.lyrics.SetTextColor( color );
				});
				o.lay2.color.AddChild( img );
			};
			o.scroller.color = app.CreateScroller(1, 0.3);
			o.scroller.color.SetPosition( 0, 0.705 );
			o.scroller.color.SetVisibility('Gone' );
			o.scroller.color.SetBackColor("#66000000");
			o.lay2.color = app.CreateLayout("Linear", "Horizontal");
			o.lay2.color.SetPadding( 0.01, 0.01, 0.01, 0.01 );
			o.scroller.color.AddChild(o.lay2.color);
			
			addColor('#222222');
			addColor('#666666');
			addColor('#aaaaaa');
			addColor('#ffffff');
			o.lay2.main.AddChild(o.scroller.color );
		}
	},
	drawer: {
		d1: function() {
			o.drawer.d1 = app.CreateScroller(0.3, 1);
			o.drawer.d1.SetBackColor("#666666");
		},
		d2: function() {
			o.drawer.d2 = app.CreateScroller(0.3, 1);
			o.drawer.d2.SetBackColor("#666666");
			o.lay2.d2 = app.CreateLayout("Linear", "");
			o.drawer.d2.AddChild(o.lay2.d2);
		}
	}
};

function OnStart() {
	// Create interface
	create.lay1.main();
		create.lay1.top();
			create.txt.dir();
			create.btn.pins();
			create.btn.go();
		create.img.line();
		create.list.files();

	create.lay2.main();

		create.lay2.bg();
			create.img.bg();
		create.lay2.lyrics();
			create.txt.lyrics();
		create.txt.bg();

		create.lay2.top();
			create.btn.back();
			create.txt.title();
			create.btn.nav();
			
		create.lay2.btns();
			create.btn.navBtns();

		create.lay2.bottom();
			create.lay2.time();
				create.txt.posTime();
				create.txt.durTime();
			create.skb.time();
			create.lay2.play();
				create.btn.play();
				create.skb.vol();

	create.scroller.photo();
	create.scroller.font();
	create.scroller.color();
	//create.drawer.d1();
	//create.drawer.d2();

	app.AddLayout(o.lay2.main);
	//app.AddDrawer(o.drawer.d1, "Left", 0.3);
	//app.AddDrawer(o.drawer.d2, "Right", 0.3);

	// fixes
	o.lay2.bottom.SetPosition(0, 1 - o.lay2.bottom.GetHeight() + 0.001);
	o.lay2.bottom.SetVisibility("Show");
	shortenLyrics();
	o.lay2.lyrics.SetVisibility("Show");
	app.AddLayout(o.lay1.main);
	o.list.files.SetSize(1, 1 - o.lay1.top.GetHeight() - o.img.line.GetHeight());
	o.list.files.SetVisibility("Show");

	// Get pins list from user storage
	// fill pins if there is, or files
	path.getPins();
	
	// Options
	//prevScreenLock = app.LoadText( 'prevScreenLock', '0') == '1';
	prevScreenLock = true;

	// create media player.
	player = app.CreateMediaPlayer();
	player.SetOnReady(player_OnReady);
	player.SetOnComplete(player_OnComplete);
}

function OnDrawer(side, state) {
	if (side == 'Left' && state == 'Open') {
		if (!bg.loaded) {
			var dir = app.LoadText("bgDir");
			if (dir) { bg.fill(dir); }
			else {
				var txt = app.CreateText("Select a folder with pictures", 0.029, -1, "Multiline");
				o.lay2.d1.AddChild(txt);
				bg.loaded = true;
			}
		}
	}
}

// HELPERS
function log() {
  	//console.log('LOG');
    for (var i = 0, arg; i < arguments.length; i++) {
        arg = arguments[i];
        console.log('__[LOG'+i+'] : ['+arg+']__');
    }
}
function wait(str) {
	setTimeout(function() {
		eval(str);
	}, 1000);
}
function inArray(ar, item) { return ar.indexOf(item) != -1; }
function lastPart(path, ext) {
	var last = path.substr(path.lastIndexOf("/") + 1) || '/';
	if (typeof ext != 'undefined' && ext === false) {
		return last.substr(0, last.lastIndexOf("."));
	} else {
		return last;
	}
}
function parentDir(path) {
	return path.substr(0, path.lastIndexOf("/")) || '/';
}
function getExt(path){
	var ar = path.match(/\.([^\.]+)$/);
	return ar ? ar[1].toLowerCase() : '' ;
}
function formatTime(secs) {
	var h, m, s;
	secs = Math.floor(secs);
	h = Math.floor(secs / 3600);
	secs = secs % 3600;
	m = Math.floor(secs / 60);
	s = secs % 60;
	if (h == 0) {
		return m + ':' + addZero(s);
	} else {
		return h + ':' + addZero(m) + ':' + addZero(s);
	}
}
function addZero(n) {
	return ('0' + n).substr(-2);
}
function noIcon(text) {
	return text.replace(/\[[^\]]+\]/, '').trim();
}
function test() {
	var str = '';
	for (var i = 0; i < lrc.times.length; i++) {
		str += lrc.times[i] + ' ' + lrc.texts[i] + '\n';
	}
	app.ShowPopup(lrc.times.length);
	o.txt.lyrics.SetText(str);
}

// funciones que usan objetos
function addLine(lay, w) {
	var line = app.CreateImage(null, w, 0.004);
	line.SetColor("#444444");
	lay.AddChild(line);
}
function toggleVis(obj) {
	var showed = obj.GetVisibility() == 'Show';
	obj.SetVisibility( showed ? 'Gone' : 'Show' );
	return !showed;
}
function styleBtn(btn) {
	btn.SetStyle("#66000000", "#66000000", 4, "#33000000", 1, 0);
	btn.SetTextColor("#999999");
}
function createNavBtn(icon, onTouch) {
	var btn = app.CreateButton('[fa-'+icon+']', 0.15, -1, "FontAwesome, Custom");
	styleBtn(btn);
	btn.SetTextSize(20);
	btn.SetPadding(0, 0.02, 0, 0.03);
	btn.SetOnTouch(onTouch);
	o.lay2.btns.AddChild(btn);
}

// LISTENERS LAY 1
function btnPins_OnTouch() {
	if (path.pins.showed) {
		path.fillList(path.lastPath || '/');
		o.btn.pins.SetText('[fa-thumb-tack]');
	} else {
		path.lastPath = path.path;
		path.fillPins();
		o.btn.pins.SetText('[fa-folder]');
	}
	path.pins.showed = !path.pins.showed;
}

function listFiles_OnTouch(title, body, type, index) {
	var _path = path.list[index];
	if (path.types[index] == 0) { // is dir
		path.pins.showed = false;
		o.btn.pins.SetText('[fa-thumb-tack]');
		path.fillList(_path);
	} else { // is file
		o.lay1.main.Animate("SlideToLeft");
		o.lay2.main.Animate("SlideFromRight");
		if (player.IsPlaying()) btnPlay_OnTouch();
		player.SetFile(_path);
		o.txt.title.SetText(lastPart(_path, false));
		lrc.find(_path);
		if (lrc.has) {
			lrc.processFile();
		} else {
			o.txt.lyrics.SetText('Lyric file not found');
		}
	}
}

function listFiles_OnLongTouch(title, body, type, index) {
	var bgText = '[fa-photo] Set background image dir';
	var fontText = '[fa-font] Set font dir';
	var isPin = inArray(path.pins.list, path.list[index]);
	var list = [ isPin ? '[fa-reply] Unpin' : '[fa-thumb-tack]  Pin' ];
	if (path.types[index] == 0) { list.push(bgText, fontText); }
	var dlg = app.CreateDialog( title );
	var layDlg = app.CreateLayout( "Linear", "Vertical, FillXY, Left" );
	dlg.AddLayout( layDlg );
	var txt_OnTouchDown = function () {
		this.SetBackColor('#005599');
	};
	var txt_OnTouchUp = function () {
		dlg.Hide();
		var dir = path.list[index];
		var text = this.GetText().substr(1).trim();
		console.log(text.charCodeAt(0));
		console.log(noIcon(bgText));
		if ( text == noIcon(bgText) ) {
			app.SaveText("bgDir", dir);
			app.ShowPopup('Set background image dir\n' + title, 'Short,Bottom');
			bg.fill(dir);
		} else if ( text == noIcon(fontText) ) {
			app.SaveText( 'fontDir', dir );
			app.ShowPopup('Set font dir\n'+title, 'Short, Bottom');
			font.fill(dir);
		} else {
			if (isPin) {
				var i = path.pins.list.indexOf(dir);
				path.pins.list.splice(i, 1);
				path.pins.types.splice(i, 1);
				app.SaveText('pinnedList', JSON.stringify(path.pins.list));
				app.SaveText('pinnedTypes', JSON.stringify(path.pins.types));
				app.ShowPopup('Unpinned\n' + title, 'Short, Bottom');
				if (path.pins.showed) path.fillPins();
			} else {
				path.pins.list.push(dir);
				path.pins.types.push(path.types[index]);
				app.SaveText('pinnedList', JSON.stringify(path.pins.list));
				app.SaveText('pinnedTypes', JSON.stringify(path.pins.types));
				app.ShowPopup('Pinned\n' + title, 'Short, Bottom');
			}
		}
	};
	var w = 0.86;
	for (var i = 0, txt; i < list.length; i++) {
		txt = app.CreateText( list[i], w, -1, 'FontAwesome, Left' );
		txt.SetPadding( 0.03, 0.03, 0.03, 0.03 );
		txt.SetTextSize( 18 );
    txt.SetTextColor( "#dddddd" );
    txt.SetOnTouchDown( txt_OnTouchDown );
    txt.SetOnTouchUp( txt_OnTouchUp );
    layDlg.AddChild( txt );
    if (i < list.length - 1) { addLine(layDlg, w); }
	}
	dlg.Show();
}

function btnGo_OnTouch() {
	o.lay2.main.Animate("SlideFromRight");
	o.lay1.main.Animate("SlideToLeft");
}

//LISTENERS LAY 2
function btnBack_OnTouch() {
	o.btn.go.SetVisibility('Show');
	o.lay1.main.Animate("SlideFromLeft");
	o.lay2.main.Animate("SlideToRight");
}

var openedBtns = false
var openedScroller = false;
function btnNav_OnTouch() {
	openedBtns = toggleVis(o.lay2.btns);
	shortenLyrics();
}
function btnPhoto_OnTouch() {
		if (!openedScroller || openedScroller == 'photo') {
		toggleVis(o.lay2.bottom);
	} else {
		toggleVis(o.scroller[openedScroller]);
	}
	openedScroller = toggleVis(o.scroller.photo) ? 'photo' : false;
	if (openedScroller && !bg.loaded) {
		bg.fill( app.LoadText("bgDir") );
	}
}
function btnFont_OnTouch() {
	if (!openedScroller || openedScroller == 'font') {
		toggleVis(o.lay2.bottom);
	} else {
		toggleVis(o.scroller[openedScroller]);
	}
	openedScroller = toggleVis(o.scroller.font) ? 'font' : false;
	if (openedScroller && !font.loaded) {
		font.fill( app.LoadText("fontDir") );
	}
}
function btnColor_OnTouch() {
	if (!openedScroller || openedScroller == 'color') {
		toggleVis(o.lay2.bottom);
	} else {
		toggleVis(o.scroller[openedScroller]);
	}
	openedScroller = toggleVis(o.scroller.color) ? 'color' : false;
}
function btnFontSize_OnTouch() {
	
}
function btnPosition_OnTouch() {
	
}
function btnOptions_OnTouch() {
	
}

function player_OnReady() {
	time.dur = player.GetDuration();
	o.txt.durTime.SetText(formatTime(time.dur));
	time.update();
	lrc.i = -1;
	if (lrc.has) lrc.update();
	btnPlay_OnTouch();
}

function player_OnComplete() {
	o.btn.play.SetText('[fa-play]');
	clearInterval(time.itv);
	clearTimeout(lrc.tmo);
	o.txt.posTime.SetText(o.txt.durTime.GetText());
}
function lyrics_OnTouch() {
	if (lrc.isFull) {
		o.lay2.top.SetVisibility('Show');
		if (openedBtns) {o.lay2.btns.SetVisibility('Show');}
		if (openedScroller) {
			o.scroller[openedScroller].SetVisibility('Show');
		} else { o.lay2.bottom.SetVisibility('Show'); }
		shortenLyrics();
		//o.txt.lyrics.GetHeight();
		//log('posy', o.lay2.lyrics.GetPosition(  ).height);
	} else {
		o.lay2.top.SetVisibility('Gone');
		o.lay2.btns.SetVisibility('Gone');
		if (openedScroller) {
			o.scroller[openedScroller].SetVisibility('Gone');
		} else { o.lay2.bottom.SetVisibility('Gone'); }
		o.lay2.lyrics.SetVisibility('Hide');
		o.lay2.lyrics.SetSize(1, 1);
		o.lay2.lyrics.SetPosition(0, 0);
		o.lay2.lyrics.SetVisibility('Show');
	}
	lrc.isFull = !lrc.isFull;
}

function shortenLyrics() {
	var h1 = parseFloat(o.lay2.top.GetHeight());
	var h2 = openedBtns ? parseFloat(o.lay2.btns.GetHeight()) : 0 ;
	var h3 = parseFloat(o.lay2.bottom.GetHeight());
	var y = h1 + h2;
	var h = 1 - h1 - h2 - h3
	o.lay2.lyrics.SetVisibility('Hide');
	o.lay2.lyrics.SetPosition(0, y);
	o.lay2.lyrics.SetSize(1, h);
	o.lay2.lyrics.SetVisibility('Show');
}

function btnPlay_OnTouch() {
	//  o.btn.play.SetTextColor( "#aaaaaa" );
	if (player.IsPlaying()) {
		player.Pause();
		o.btn.play.SetText('[fa-play]');
		clearInterval(time.itv);
		clearTimeout(lrc.tmo);
		if (prevScreenLock) {app.PreventScreenLock( false );}
	} else {
		player.Play();
		o.btn.play.SetText('[fa-pause]');
		time.itv = setInterval(time.update, 1000);
		if (lrc.has) lrc.update();
		if (prevScreenLock) {app.PreventScreenLock( true );}
	}
}

function btnPlay_OnTouchDown() {
	o.btn.play.SetTextColor('#9999ff');
}

function skb_OnTouch(value) {
	player.SeekTo((time.dur * value).toFixed(2));
	time.update();
	lrc.i = -1;
	if (lrc.has) lrc.update();
}

function skbVol_OnTouch(value) {
	player.SetVolume(value, value);
}

// CLASES (INSTANCIAS)
/* Objeto que tiene variables y funciones
relacionadas con el cambio de fondo */
var bg = new (function() {
	var that = this;
	var exts = ['jpg', 'jpeg', 'bmp', 'png'];
	var width = 0.3;
	var height = width * app.GetDisplayWidth() / app.GetDisplayHeight();
	this.paths = null; // user photos
	this.paths2 = null; // app photos
	var layH;
	this.loaded = false;
	this.n = 0; // used for loading thumbs
	this.path = app.LoadText( 'bgPath', 'bg/1.jpg' );
	if ( !app.FileExists(this.path) ) {
		app.ShowPopup('No file found in the saved background file path\n'+this.path+'\nChanged or removed external SDCard?' );
		this.path = 'bg/1.jpg';
	}
	this._fill = function() { // user photos
		var n = that.n;
		if (n%3==0) {
			layH = app.CreateLayout( "Linear", "Horizontal" );
			o.lay2.photo.AddChild(layH);
		}
		if (n >= that.paths.length) return;
		o.imgs.bg[n] = app.CreateImage(that.paths[n], width, height, "async, Resize");
		o.imgs.bg[n].SetMargins(0.01, 0.01, 0.01, 0.01);
		o.imgs.bg[n].SetOnTouchUp(function(ev) {
			that.path = that.paths[n];
			//app.ShowPopup(that.path);
			app.SaveText( 'bgPath', that.path );
			create.img.bg();
		});
		o.imgs.bg[n].SetOnLoad(function() {
			that.n++;
			that._fill();
		});
		layH.AddChild(o.imgs.bg[n]);
	};
	this.fill = function(dir) {
		that.loaded = true;
		that.n = 0;
		o.imgs.bg = [];
		that.paths = [];
		that.paths2 = [];
		
		// remake lay2.photo
		if (o.lay2.photo) { o.scroller.photo.RemoveChild(o.lay2.photo); }
		o.lay2.photo = app.CreateLayout("Linear", "Vertical, FillX");
		o.lay2.photo.SetSize(1, -1);
		o.lay2.photo.SetPadding( 0.01, 0.01, 0.01, 0.01 );
		o.scroller.photo.AddChild(o.lay2.photo);
		
		// create user photo list
		if (dir) {
			var list = app.ListFolder(dir), ext;
			var sep = (dir=='/') ? '' : '/';
			for (var i = 0, len = list.length; i < len; i++) {
				if (inArray( exts, getExt( list[i] ) )) {
					that.paths.push(dir + sep + list[i]);
				}
			}
			if (that.paths.length == 0) {
			  var txt = app.CreateText("There isn't images in the folder\n"+dir, 0.96, -1, "Multiline");
				o.lay2.photo.AddChild(txt);
			}
			that._fill();
		}
		// create app photo list
		var dir2 = app.GetAppPath()+'/bg';
		var list = app.ListFolder( dir2 );
		for (var i = 0, len = list.length; i < len; i++) {
			if (inArray( exts, getExt( list[i] ) )) {
				that.paths2.push(dir+'/'+list[i]);
			}
		}
	}
	var itv, nItv;
	var timesPerSec = 10;
	var centerBg = function () {
		nItv++;
		if (nItv > 2*timesPerSec) {clearInterval(itv);}
		if (!o.img.bg) return;
		var w = o.img.bg.GetWidth();
		if (w == 0) return;
		clearInterval(itv);
		var h = o.img.bg.GetHeight(),
			W = (w < h ? 1 : 1/h),
			H = (w < h ? 1/w : 1);
		o.img.bg.SetSize( W, H );
		o.img.bg.SetVisibility( 'Show' );
	};
	this.center = function() {
		nItv = 0;
		itv = setInterval(centerBg, 1000/timesPerSec);
	};
})();

/* Objeto que tiene variables y funciones
relacionadas con el cambio de fuente */
var font = new (function() {
	var that = this;
	this.loaded = false;
	var addFont  = function (path) {
		var fileName = lastPart(path, false)
		var txt = app.CreateText( fileName, 0.7, 0.1,'AutoScale');
		txt.SetTextColor( '#cccccc' );
		txt.SetFontFile(path );
		txt.SetBackColor( "#33000000" );
		txt.SetTextSize( 26 );
		txt.SetEllipsize( 'end' );
		txt.SetMargins( 0.01, 0.01, 0.01, 0.01 );
		txt.SetOnTouchUp( function () {
			o.txt.lyrics.SetFontFile( path );
		});
		o.lay2.font.AddChild( txt );
	};
	this.fill = function(dir) {
		that.loaded = true;
		//remake lay2.font
		if (o.lay2.font) { o.scroller.font.RemoveChild(o.lay2.font); }
		o.lay2.font = app.CreateLayout("Linear", "Vertical, FillX");
		o.lay2.font.SetSize(1, -1);
		o.lay2.font.SetPadding( 0.01, 0.01, 0.01, 0.01 );
		o.scroller.font.AddChild(o.lay2.font);
			
		// Create user fonts list
		if (dir) {
			var list = app.ListFolder( dir, '.ttf' ).concat(app.ListFolder(dir, '.otf'));
			var sep = (dir=='/') ? '' : '/';
			for (var i = 0, len = list.length; i < len; i++) {
				addFont(dir+sep+list[i]);
			}
			if (list.length == 0) {
			  var txt = app.CreateText("There isn't fonts in the folder\n"+dir, 0.96, -1, "Multiline");
				o.lay2.font.AddChild(txt);
			}
		}
		// Create app fonts list
		var dir2 = app.GetAppPath()+'/fonts';
		var list = app.ListFolder( dir2, '.ttf' ).concat(app.ListFolder(dir2, '.otf'));
		for (var i = 0, len = list.length; i < len; i++) {
			addFont(dir2+'/'+list[i]);
		}
	};
})();

/* Objeto que procesa funciones de rutas */
var path = new(function() {
	var that = this;
	this.path = null;
	this.list = null;
	this.types = null;
	this.lastPath = null; // last path before change to pinned folder/files
	this.pins = {
		showed: null,
		list: null,
		types: null
	};
	this.makeData = function() {
		that.list = [];
		that.types = [];
		var list = app.ListFolder(that.path),
			exts = ['mp3', 'm4a'],
			sep = (that.path=='/' ? '' : '/'),
			out = [],
			path, item,
			folders = [], audios = [];
		if (that.path != '/') {
			out.push('..:folder');
			that.list.push(parentDir(that.path));
			that.types.push(0);
		}
		for (var i = 0, len = list.length; i < len; i++) {
			item = list[i];
			if (app.FolderExists(that.path+sep+item)) {
				folders.push(item);
			} else if (inArray(exts, getExt(item))) {
				audios.push(item);
			}
		}
		folders.sort();
		for (var i = 0, len = folders.length; i < len; i++) {
			path = that.path + sep + folders[i];
			out.push(folders[i].replace(',', ' ') + ':folder');
			that.list.push(path);
			that.types.push(0); // dir
		}
		audios.sort();
		for (var i = 0, len = audios.length; i < len; i++) {
			path = that.path + sep + audios[i];
			out.push(audios[i].replace(',', ' ') + ':audio');
			that.list.push(path);
			that.types.push(1); // file
		}
		return out;
	};
	this.fillList = function(path) {
		that.path = path;
		o.txt.dir.SetText('[fa-folder]  ' + lastPart(path));
		o.list.files.SetList(that.makeData());
	};
	this.makeDataPinned = function() {
		that.list = that.pins.list;
		that.types = that.pins.types;
		var out = [],
			item;
		for (var i = 0, len = that.list.length; i < len; i++) {
			item = lastPart(that.list[i]);
			if (that.types[i] == 0) { // dir
				out.push(item.replace(',', ' ') + ':folder');
			} else if (that.types[i] == 1) { // file
				out.push(item.replace(',', ' ') + ':audio');
			}
		}
		return out;
	};
	this.fillPins = function() {
		o.txt.dir.SetText('[fa-thumb-tack]  Pinned');
		o.list.files.SetList(that.makeDataPinned());
	};
	this.getPins = function() {
		var list = app.LoadText('pinnedList');
		var types = app.LoadText('pinnedTypes');
		if (list && list != '[]') { // there are pins
			that.pins.list = JSON.parse(list);
			that.pins.types = JSON.parse(types);
			that.fillPins();
			o.btn.pins.SetText('[fa-folder]');
			o.btn.pins.SetVisibility('Show');
			that.pins.showed = true;
		} else { // no pins
			that.pins.list = [];
			that.pins.types = [];
			that.fillList('/');
			o.btn.pins.SetText('[fa-thumb-tack]');
			o.btn.pins.SetVisibility('Show');
			that.pins.showed = false;
		}
	};
})();

/* Objeto que procesa funciones 
del tiempo de reproduccion */
var time = new(function() {
	var that = this;
	this.itv = null;
	this.dur = null;
	this.update = function() {
		var prog = player.GetPosition();
		if (that.dur) {
			o.skb.time.SetValue((prog / that.dur).toFixed(4));
		}
		o.txt.posTime.SetText(formatTime(prog));
	};
})();

/* Objeto que consigue y muestra
 los datos del archivo lrc */
var lrc = new(function() {
	var that = this;
	this.has = false;
	this.i = -1;
	this.times = []; //secs
	this.texts = [];
	this.tmo = null;
	this.isFull = false;
	this.file = null;
	// Funciones de actualizacion (update)
	var isI = function(pos, i) {
		return (that.times[i] <= pos && that.times[i + 1] > pos);
	};
	// Consigue el texto de acuerdo al tiempo
	var get = function(pos) {
		if (that.i == -1) { //onready, skb_ontouch
			if (pos < that.times[0]) return '';
			for (var i = 0, len = that.times.length; i < len; i++) {
				if (isI(pos, i)) {
					that.i = i;
					return that.texts[that.i];
				}
			}
			return '';
		} else { // sto
			if (isI(pos, that.i)) {
				return that.texts[that.i];
			} else {
				that.i = -1;
				return get(pos);
			}
		}
	};
	var sto = function() { // SetTimeOut
		if (that.i + 1 >= that.times.length) return;
		var delay = (that.times[that.i + 1] - player.GetPosition()) * 1000;
		if (delay <= 0) return;
		that.tmo = setTimeout(function() {
			that.i++;
			that.update();
		}, delay);
	};
	this.update = function() {
		var pos = player.GetPosition();
		o.txt.lyrics.SetText(get(pos));
		// test();
		clearTimeout(that.tmo);
		if (player.IsPlaying()) {
			sto();
		}
	};
	// Proceso de obtencion de datos (processFile)
	var processLine = function(str) {
		var txt = str;
		var times = [],
			finished = false;
		// log ('str', txt)
		while (!finished) {
			var data = processSingle(txt);
			if (data) {
				times.push(data.time);
				txt = data.txt;
			} else {
				finished = true;
			}
		}
		// log('txt', txt);
		//log('ntimes', times.length);
		for (var i = 0, len = times.length; i < len; i++) {
			// log ('i,time,txt', i+' '+times[i]+' '+txt);
			add(times[i], txt);
		}
	};
	//var n = 0;
	var processSingle = function(txt) {
		var data = {};
		// i.e.: [23:34] ; [56:34.48]
		var ar = txt.match(/^\[(\d{2,3})\:(\d{2})(\.\d{2})?\](.*)/);
		//if (n< 10){ n++; log('txt', ar);}
		if (ar) {
			data.time = (+ar[1]) * 60 + (+ar[2]) + (+('0' + (ar[3] || '')));
			data.txt = ar[4];
			return data;
		} else {
			return false;
		}
	};
	var add = function(time, str) {
		// if (time == 0) log ('t0', str);
		var len = that.times.length;
		if (len == 0 || time > that.times[len - 1]) {
			that.times.push(time);
			that.texts.push(str);
			return;
		}
		for (var i = len - 1, dif; i >= 0; i--) {
			dif = time - that.times[i];
			//if (dif>=-0.04)app.WriteFile( '/sdcard/a.txt', dif+' '+time+' '+str+'\n', 'Append' );
			if (dif > 0.04) {
				// log ('t', time+ ' '+that.times[i]);
				that.times.splice(i + 1, 0, time);
				that.texts.splice(i + 1, 0, str);
				return;
			} else if (dif <= 0.04 && dif >= 0) {
				if (str.trim() != '') {
					that.texts[i] = str;
					that.times[i] = time;
				}
				return;
			}
		}
	};
	this.processFile = function() {
		var lrcContent = app.ReadFile(that.file);
		var lines = lrcContent.split('\n');
		that.times = [];
		that.texts = [];
		// log('nlines', lines.length);
		for (var i = 0, len = lines.length; i < len; i++) {
			processLine(lines[i]);
		}
		for(var i = 0, str = ''; i < that.times.length; i++) {
			str += '['+(that.times[i]- (that.times[i-1] || 0))+'] '+that.texts[i]+'\n';
		}
		app.WriteFile( '/sdcard/log.txt', str ) ;
	};
	// Finds lrc file of audio file
	var similar = function (fileName, item) {
		fileName = fileName.toLowerCase();
		item = item.toLowerCase();
		//
	};
	var near = function (path) {
		var fileName = lastPart(path, false);
		var list = app.ListFolder( parentDir(path), '.lrc' );
		var sim, degree = 0, lrcFile;
		for (var i = 0, len = list.length; i < len; i++) {
			sim = similar(fileName, list[i].substr(0,-4));
			if (sim && sim[0] > degree) { 
					degree = sim[0];
					lrcFile = sim[1];
			}
		}
		return degree == 0 ? false : lrcFile;
	};
	this.find  = function (path) {
		lrc.file = path.replace(/\.[^\.]+$/, '.lrc');
		lrc.has = app.FileExists(lrc.file);
		if (!lrc.has) {
			//lrc.file = near(path);
			//lrc.has = !!lrc.file;
		}
	};
})();