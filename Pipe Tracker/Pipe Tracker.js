
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * \
|*
|* This application is made by Symbroson
|* for the Game++ Community Challenge 2016
|* 
|* You are allowed to use any snippetnof my code
|* But please leave a note in your main code heading
|* and in your credits if you have some.
|* ask me if you have questions!
|* best regards,
|* Alex
|* 
|* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
|*
|* all graphics are created by me
|* please ask me before you use any of them
|*
|* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
|*
|* contact:
|* alex.symbroson@gmail.com
|*
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

//text font: http://dl.dafont.com/dl/?f=Font
//music: https://www.jukedeck.com

function ranInt(v) {
	return Math.floor(Math.random() * (v + 1))
}

function newTile(type) {
	return {
		'type': 1 * type,
		'angle': ranInt(3),
		'rotate': false,
		'fixed': false,
		'item': null
	}
}

function newPos(x, y, dir) {
	return {
		'x': x,
		'y': y,
		'dir': dir
	}
}

function J(v) {
	return JSON.stringify(v) + '\n'
}

function addItem(name, max) {
	items.push({
		'name': name,
		'img': glGame.CreateImage('Img/' + name + '.png'),
		'max': max,
		'count': 0
	});
}

function none() {}

f = 1.4
items = [];
ball = {
	'cx': 0,
	'cy': 0,
	'px': 0,
	'py': 0,
	'walk': 0,
	'dir': 3,
	'v': 0
};
pos = newPos(1, 0, 3);
framecount = 0;
rotv = f * .05;
gameCoins = 0;
Coins = app.LoadNumber('Coins', 0);

function OnStart() {
	//app.LoadPlugin('GifViewer');
	//app.SetOnError(none)
	app.SetOrientation('Landscape');
	app.SetScreenMode('game');
	wh = app.GetScreenHeight() / app.GetScreenWidth();

	if(app.ListFolder(app.GetPrivateFolder('Level')).length != app.ListFolder('Level').length) {
		app.ListFolder('Level').forEach(function(name) {
			if(!app.FileExists(app.GetPrivateFolder('Level') + '/' + name)) app.WriteFile(app.GetPrivateFolder('Level') + '/' + name, app.ReadFile('Level/' + name));
		});
	}

	if(app.ListFolder(app.GetPrivateFolder('Quests')).length != app.ListFolder('Quests').length) {
		app.ListFolder('Quests').forEach(function(name) {
			if(!app.FileExists(app.GetPrivateFolder('Quests') + '/' + name)) app.WriteFile(app.GetPrivateFolder('Quests') + '/' + name, app.ReadFile('Quests/' + name));
		});
	}

	var arr = [1, 1];
	for(var i = 1; i < app.ListFolder('Img/Skins').length; i++) arr.push(0)
	lst = app.LoadText('Skins', arr);
	app.SaveText('Skins', lst);


	var layMain = app.CreateLayout('absolute');

	var laySplash = app.CreateLayout('Linear');
	laySplash.SetBackground('Gif/Splash.png');
	/*
	GV=app.CreateGifViewer()
	gif=GV.CreateGifImage(null,1,1);
	gif.SetImage(GV.GetGifPath('Splash'))
	gif.OnAnimationComplete(gifready);
	laySplash.AddChild(gif);
	*/
	/*
	gif = app.CreateImage( "Gif/Splash.gif", 1, 1 );
	laySplash.AddChild(gif);
	gif.SetSize( 1.3*gif.GetAbsHeight()/gif.GetAbsWidth(), 1)
	*/
	app.AddLayout(laySplash);


	var layHome = app.CreateLayout('absolute');
	layHome.SetBackColor('white');
	layHome.SetVisibility('Hide');
	layHome.SetSize(1, 1);
	setHomeVis = function(vis) {
		layHome.SetVisibility(vis)
	}

	var txtHead = app.CreateText('Pipe Tracker', -1, -1, 'multiline');
	txtHead.SetFontFile('Font.ttf');
	txtHead.SetTextSize(60);
	txtHead.SetTextColor('black');
	txtHead.SetPosition(.15, .05);
	layHome.AddChild(txtHead);

	var btnMore = newButton('More', .18, .08 / wh, 37, function() {
		app.ShowPopup('Loading...');
		dlgMore.Show();
		web.LoadUrl('http://www.dropbox.com/sh/i7zd2q2nz9o2anv/AAA7BfmTVt3oSQIUT9LNMA5da')
	});
	btnMore.SetPosition(.79, .45 / wh);
	layHome.AddChild(btnMore);

	var btnStart = newButton('Start', .3, .2, 50, function() {
		animate(layLevels, 'SlideFromRight', null, 500)
	});
	btnStart.SetPosition(.5 - btnStart.GetWidth() / 2, .3);
	layHome.AddChild(btnStart);

	var btnEditor = newButton('Editor', .3, .2, 42, function() {
		var dlg = app.CreateDialog('', 'nocancel,notitle,shownow');
		var layDlg = app.CreateLayout('absolute');
		var edtWidth = app.CreateTextEdit('5', .11, -1, 'singleline,numbers');
		edtWidth.SetHint('Width');
		edtWidth.SetPosition(.05, .05);
		layDlg.AddChild(edtWidth);

		var edtHeight = app.CreateTextEdit('3', .11, -1, 'singleline,numbers');
		edtHeight.SetHint('Height');
		edtHeight.SetPosition(.2, .05);
		layDlg.AddChild(edtHeight);
		dlg.AddLayout(layDlg);

		var btnOk = app.CreateButton('Ok');
		btnOk.SetPosition(.12, .16);
		btnOk.SetOnTouch(function() {
			var w = Math.floor(1 * edtWidth.GetText()),
				h = Math.floor(1 * edtHeight.GetText());
			if(h > 10 || h < 3) {
				app.ShowPopup('The map must be between 3 und 10 Felder high!');
				return;
			}
			if(w > 20 || w < 5) {
				app.ShowPopup('The map must be between 5 and 20 fields wide!');
				return;
			}

			imgEditor.array = [];
			for(var i = 0; i < h; i++) {
				imgEditor.array.push([]);
				for(var j = 0; j < w; j++) imgEditor.array[i].push(newTile(0));
			}
			imgEditor.array[0][0].angle = 1;
			imgEditor.size = {
				'w': w,
				'h': h
			};
			imgEditor.Render();
			dlg.Hide();
			alert('Tap on a field to select it\nTip again to change its type\turn it with the left button');
		});
		layDlg.AddChild(btnOk);
		dlg.Show();
		animate(layEdit, 'FadeIn');
	});
	btnEditor.SetPosition(.5 - btnEditor.GetWidth() / 2, .55);
	layHome.AddChild(btnEditor);

	/*
	btnSendTD=newButton('Senden',.15,.1,30,function(){
		var ynd=app.CreateYesNoDialog('Möchtest du alle erstellten Level zum Entwickler schicken?','shownow');
		ynd.SetOnTouch(function(reply){
			if(reply=='Yes'){
				var arr=[];
				app.ListFolder(app.GetPrivateFolder('ownLevel')).forEach(function(name){
					arr.push(app.ReadFile(app.GetPrivateFolder('ownLevel')+'/'+name)+':');
				});
				app.SendMail('alex.symbroson@gmail.com','New Levels for Pipe Tracker','here are my levels:\n'+(''+arr).replace(/:\,/g,':'));
			}
		 });
	});
	btnSendTD.SetPosition(.4,.87);
	layHome.AddChild(btnSendTD);
	*/
	layMain.AddChild(layHome);

	var btnExit = newButton('Exit', .1, .1 / wh, -1, function() {
		var ynd = app.CreateYesNoDialog('Do you want to leave PipeTracker?', 'ShowNow');
		ynd.SetOnTouch(function(reply) {
			if(reply == 'Yes') app.Exit();
		});
	});
	btnExit.SetPosition(.05, .8);
	layHome.AddChild(btnExit);


	layLevels = app.CreateLayout('absolute');
	layLevels.SetBackColor('white');
	layLevels.SetSize(1, 1);
	layLevels.page = 0;
	layLevels.SetVisibility('Hide');

	var btnSettings2 = newButton('Gear', .08, .08 / wh, -1, function() {
		updSetSkinLst();
		animate(laySettings, 'SlideFromTop', null, 500)
	});
	btnSettings2.SetPosition(.03, .03 / wh);
	layLevels.AddChild(btnSettings2);

	var btnShop = newButton('Shop', .08, .08 / wh, -1, function() {
		updBuySkinLst();
		animate(layShop, 'SlideFromBottom', null, 500)
	});
	btnShop.SetPosition(.87, .8);
	layLevels.AddChild(btnShop);

	var btnHome = newButton('Home', .08, .08 / wh, -1, function() {
		animate(layLevels, 'SlideToRight', null, 500)
	});
	btnHome.SetPosition(.03, .97 - btnHome.GetHeight());
	layLevels.AddChild(btnHome);

	var btnLeft = newButton('Arrow', .1, .4, -1, switchPage);
	btnLeft.SetPosition(0, .3);
	btnLeft.diff = -1;
	layLevels.AddChild(btnLeft);

	var btnRight = newButton('Arrow', .1, .4, -1, switchPage, -1);
	btnRight.SetScale(-1, 1);
	btnRight.SetPosition(.9, .3);
	btnRight.diff = 1;
	layLevels.AddChild(btnRight);

	btnChLvls = newButton('Own', .21, .18, 30, function() {
		btnChLvls.SetText(btnChLvls.Text == 'Normal' ? 'Own' : 'Normal');
		loadLevels(app.GetPrivateFolder(btnChLvls.Text == 'Own' ? 'Level' : 'ownLevel'));
		layLvGrid.SetVisibility('Show');
	});
	btnChLvls.SetPosition(.25, .05);
	layLevels.AddChild(btnChLvls);

	btnDownload = newButton('  [fa-download]', .2, .18, 50, function() {
		var dlg = app.CreateDialog('', 'notitle,ShowNow');
		var address = 'http://pipetracker.bplaced.net/iface/level.iface.php?'
		var layDlg = app.CreateLayout('absolute');
		layDlg.SetSize(.5, .9);

		var list = app.CreateList('', .5, .9);
		list.SetOnTouch(function(name, autor, token, index) {
			var ynd = app.CreateYesNoDialog('Do you want to download the level ' + name + ' by ' + autor + '?', 'ShowNow');
			ynd.SetOnTouch(function(reply) {
				if(reply == 'Yes') {
					var download = address + 'action=get&id=' + token;
					app.HttpRequest('get', download, '', '', function(a, reply) {
						if(reply.indexOf('No address associated with hostname') > 0) {
							app.ShowPopup('No internet connection!');
							return
						}
						if(reply == 'exception.notfound') {
							app.ShowPopup('File not found');
							return
						}
						var lst = app.ListFolder(app.GetPrivateFolder('ownLevel'));
						var i = 1;
						while(lst.indexOf('' + i) > -1) i++;
						app.WriteFile(app.GetPrivateFolder('ownLevel') + '/' + i, reply);
						app.ShowPopup('Downloaded');
						loadLevels(app.GetPrivateFolder(btnChLvls.Text == 'Own' ? 'Level' : 'ownLevel'));
						layLvGrid.Show();
					});
				};
			});
		});
		layDlg.AddChild(list);

		var listlvls = address + 'action=list&off=0&limit=100'
		app.HttpRequest('get', listlvls, '', '', function(a, reply) {
			app.HideProgress();
			if(reply.indexOf('No address associated with hostname') > 0) {
				app.ShowPopup('No internet connection!');
				return
			}
			var lst = [];
			reply.split('\n').forEach(function(data) {
				data = data.split(' ');
				lst.push(data[1] + ':' + data[2] + ':' + data[0]);
			});
			lst.pop();
			list.SetList(decodeURI(lst));
		});

		dlg.AddLayout(layDlg);
		dlg.Show();
		app.ShowProgress('Loading...');
	});
	btnDownload.SetPosition(.55, .05);
	layLevels.AddChild(btnDownload);

	var btnQuests = newButton('Quests', .18 * wh, .18, -1, function() {
		dlgQuests.Show();
	});
	btnQuests.SetPosition(.87, .05);
	layLevels.AddChild(btnQuests);

	layLvGrid = app.CreateLayout('Linear');
	layLevels.AddChild(layLvGrid);
	layMain.AddChild(layLevels);

	var dlgQuests = app.CreateDialog('', 'noTitle');
	var layQuests = app.CreateLayout('Absolute');
	layQuests.SetBackColor('white');
	layQuests.SetSize(.6, .9);

	var txtHeadQ = app.CreateText('Quests');
	txtHeadQ.SetFontFile('Font.ttf', .8);
	txtHeadQ.SetTextSize(60);
	txtHeadQ.SetTextColor('black');
	txtHeadQ.SetPosition(.1, 0);
	layQuests.AddChild(txtHeadQ);

	var txtQcoins = app.CreateText('c: ' + Coins);
	txtQcoins.SetTextColor('black');
	txtQcoins.SetFontFile('Font.ttf');
	txtQcoins.SetTextSize(30);
	txtQcoins.SetPosition(.05, .15);
	layQuests.AddChild(txtQcoins);

	var scrQ = app.CreateScroller(.6, .6);
	scrQ.lay = null;
	scrQ.SetPosition(0, .25);

	updQuestList = function() {
		questCondLst = [];
		txtQcoins.SetText('c: ' + Coins);
		if(scrQ.lay) scrQ.DestroyChild(scrQ.lay);
		scrQ.lay = app.CreateLayout('Linear');

		app.ListFolder(app.GetPrivateFolder('Quests')).forEach(function(name) {
			var data = app.ReadFile(app.GetPrivateFolder('Quests') + '/' + name).split('|');
			if(data[0] == '0') questCondLst.push({
				'name': name,
				'cond': data[3]
			});
			var lay = app.CreateLayout('Linear', 'Horizontal,VCenter');
			scrQ.lay.SetSize(.6, -1);
			lay.SetBackGradient(1 * data[0] ? '#ddffdd' : '#ffdddd', 1 * data[0] ? '#ccffcc' : '#ffcccc');

			var txt = app.CreateText(data[2], .4, -1, 'multiline,left');
			txt.SetTextSize(20);
			txt.SetTextColor('black');
			lay.AddChild(txt);

			var btnCollect = app.CreateButton(data[0] == '2' ? '[fa-check]' : data[1] + ' c', -1, .07 / wh, 'custom,fontawesome');
			btnCollect.SetStyle('#ffff00', '#dddd00', 5, '#aaaa00', 2, .5);
			btnCollect.SetMargins(.02);
			btnCollect.SetEnabled(data[0] == '1');
			btnCollect.SetTextColor('black');
			btnCollect.SetOnTouch(function() {

				scrQ.lay.SetTouchable(false);
				var tCoins = Coins;
				Coins += 1 * data[1];
				app.SaveNumber('Coins', Coins);
				btnCollect.SetText('[fa-check]');
				btnCollect.SetEnabled(false);
				data[0] = '2';
				app.WriteFile(app.GetPrivateFolder('Quests') + '/' + name, ('' + data).replace(/,/g, '|'));

				for(var i = tCoins; i < Coins; i += Math.ceil((Coins - i) / 10)) {
					txtQcoins.SetText('c: ' + i);
					app.Wait(.1 / (Coins - i + 1));
				}
				txtQcoins.SetText(Coins);
				scrQ.lay.SetTouchable(true);
				updCoins(Coins);
			});
			lay.AddChild(btnCollect);
			scrQ.lay.AddChild(lay);
		});
		scrQ.AddChild(scrQ.lay);
	}
	updQuestList();
	layQuests.AddChild(scrQ);
	dlgQuests.AddLayout(layQuests);

	var laySettings = app.CreateLayout('absolute');
	laySettings.SetBackColor('white');
	laySettings.SetSize(1, 1);
	laySettings.SetVisibility('Hide');

	var txtHead = app.CreateText('Settings');
	txtHead.SetFontFile('Font.ttf', .8);
	txtHead.SetTextSize(60);
	txtHead.SetTextColor('black');
	txtHead.SetPosition(.15, .05);
	laySettings.AddChild(txtHead);

	var btnReset = newButton('reset', .15, .1, 25, function() {
		Coins = 0;
		app.SaveNumber(Coins, 0);

		app.ListFolder(app.GetPrivateFolder('Level')).forEach(function(name) {
			var data = app.ReadFile(app.GetPrivateFolder('Level') + '/' + name);
			data = data[0] + (name == '1') * 1 + data.slice(-(data.length - 2));
			app.WriteFile(app.GetPrivateFolder('Level') + '/' + name, data);
		});
		loadLevels(app.GetPrivateFolder(btnChLvls.Text == 'Own' ? 'Level' : 'ownLevel'));
		layLvGrid.SetVisibility('Show');

		var skins = [1, 1];
		for(var i = 1; i < app.ListFolder('Img/Skins').length; i++) skins.push(0);
		app.SaveText('Skins', skins);
		updSetSkinLst();

		app.ListFolder(app.GetPrivateFolder('Quests')).forEach(function(name) {
			var txt = app.ReadFile(app.GetPrivateFolder('Quests') + '/' + name);
			app.WriteFile(app.GetPrivateFolder('Quests') + '/' + name, 0 + txt.slice(1 - txt.length));
		});
		updQuestList();
		updCoins(Coins);
		app.ShowPopup('Game resetted');
	});
	btnReset.SetPosition(.05, .85);
	laySettings.AddChild(btnReset);

	var scrSetSkin = app.CreateScroller(.6, .21);
	scrSetSkin.SetBackColor('#eeeeee');
	scrSetSkin.SetPosition(.2, .25);

	var updSetSkinLst = function() {
		var skins = app.LoadText('Skins').split(',');
		if(scrSetSkin.lay) scrSetSkin.DestroyChild(scrSetSkin.lay);
		var layScr = app.CreateLayout('Linear', 'Horizontal');
		scrSetSkin.chks = [];

		for(var i in skins) {
			i *= 1;
			if(!i || skins[i] == '0') continue;
			var lay = app.CreateLayout('Linear');
			var img = app.CreateImage('Img/Skins/' + i + '.png', -1, .1, 'alias');
			img.Scale(1.5, 1.5);
			lay.AddChild(img);

			var chk = app.CreateCheckBox('');
			chk.SetBackColor('#aaaaaa');
			chk.name = name;
			chk.index = i;
			chk.SetChecked(i == skins[0]);
			chk.SetOnTouch(function() {
				var chk = this;
				scrSetSkin.chks.forEach(function(obj) {
					obj.SetChecked(obj == chk);
				});
				var skins = app.LoadText('Skins').split(',');
				skins[0] = chk.index;
				Ball = glGame.CreateImage('Img/Skins/' + chk.index + '.png');
				app.SaveText('Skins', skins);
			});
			lay.AddChild(chk);
			scrSetSkin.chks.push(chk);
			layScr.AddChild(lay);
		};
		scrSetSkin.AddChild(layScr);
		scrSetSkin.lay = layScr;
	}
	laySettings.AddChild(scrSetSkin);
	layMain.AddChild(laySettings);

	var layShop = app.CreateLayout('absolute');
	layShop.SetBackColor('white');
	layShop.SetSize(1, 1);
	layShop.SetVisibility('Hide');

	var txtHead = app.CreateText('Shop');
	txtHead.SetFontFile('Font.ttf', .8);
	txtHead.SetTextSize(60);
	txtHead.SetTextColor('black');
	txtHead.SetPosition(.4, .05);
	layShop.AddChild(txtHead);

	var txtCoins = app.CreateText('c: ' + Coins);
	txtCoins.SetTextSize(40);
	txtCoins.SetFontFile('Font.ttf');
	txtCoins.SetTextColor('black');
	txtCoins.coins = 0;
	txtCoins.SetPosition(.01, .01);
	updCoins = function(n) {
		txtCoins.SetText('c: ' + n)
	};
	layShop.AddChild(txtCoins);

	var scrBuySkin = app.CreateScroller(.6, .21);
	scrBuySkin.SetBackColor('#eeeeee');
	scrBuySkin.SetPosition(.2, .25);

	var updBuySkinLst = function() {
		if(scrBuySkin.lay) scrBuySkin.DestroyChild(scrBuySkin.lay);
		var p = 100,
			d = -200;
		var layScr = app.CreateLayout('Linear', 'Horizontal');
		scrBuySkin.chks = [];

		var skins = app.LoadText('Skins').split(',');
		for(var i in skins) {
			i *= 1;
			p += d += Math.round(10 - d / 50) * 10;
			if(!i || skins[i] == '1') continue;
			var lay = app.CreateLayout('Linear');
			var img = app.CreateImage('Img/Skins/' + i + '.png', -1, .1, 'alias');
			img.Scale(1.5, 1.5);
			lay.AddChild(img);

			var btn = app.CreateButton(p <= Coins ? 'Buy' : p, .1, .1, 'Custom');
			if(p <= Coins) btn.SetStyle('#00dd00', '#00aa00', 10, '#007700', 2, 0);
			else btn.SetStyle('#dd0000', '#aa0000', 10, '#770000', 2, 0);
			btn.price = p;
			btn.index = i;
			btn.lay = lay;
			btn.SetOnTouch(function() {
				btn = this;
				if(btn.price > Coins) {
					app.ShowPopup('Dir fehlen ' + (btn.price - Coins) + ' c!');
					return;
				}
				var ynd = app.CreateYesNoDialog('Do you want to buy the skin for ' + btn.price + ' c?', 'showNow');
				ynd.SetOnTouch(function(reply) {
					if(reply == 'Yes') {
						layScr.DestroyChild(btn.lay);
						app.ShowPopup('Skin bought!');
						Coins -= btn.price;
						app.SaveNumber('Coins', Coins);
						updCoins(Coins);
						updQuestList();
						var skins = app.LoadText('Skins').split(',');
						skins[btn.index] = 1;
						app.SaveText('Skins', skins);
					}
				});
			});
			lay.AddChild(btn);
			layScr.AddChild(lay);
		};
		scrBuySkin.AddChild(layScr);
		scrBuySkin.lay = layScr;
	}
	layShop.AddChild(scrBuySkin);
	layMain.AddChild(layShop);


	var layEdit = app.CreateLayout('absolute');
	layEdit.SetBackground('Img/Back.png');
	layEdit.SetSize(1, 1);
	layEdit.SetVisibility('Hide');

	var btnRot = newButton('rotate', .09, .09 / wh, -1, function() {
		imgEditor.array[imgEditor.curpos.y][imgEditor.curpos.x].angle++;
		imgEditor.Render();
	});
	btnRot.SetPosition(.9, .5 - .09 / wh / 2);
	layEdit.AddChild(btnRot);

	imgEditor = app.CreateImage(null, .85, .85);
	imgEditor.SetAutoUpdate(false);
	imgEditor.SetPosition(.05, .05);
	imgEditor.array = [];
	imgEditor.curpos = {
		'x': 1,
		'y': 0
	};
	imgEditor.size = {
		'w': 7,
		'h': 5
	};
	imgEditor.SetOnTouch(function(ev) {
		var w = imgEditor.size.w,
			h = imgEditor.size.h;

		if(w > h * 2) {
			var sclx = w,
				scly = wh * sclx;
		} else {
			var scly = h,
				sclx = scly / wh;
		}

		var tx = Math.floor(ev.X * sclx),
			ty = Math.floor(ev.Y * scly);
		if(imgEditor.array[ty])
			if(imgEditor.array[ty][tx]) var x = tx,
				y = ty;
			else return;
		if(!x && !y) {
			app.ShowPopup('The first field cannot be changed!');
			return
		}

		if(ev.action == 'Down') {
			if(imgEditor.curpos.x == x && imgEditor.curpos.y == y) {
				var tile = imgEditor.array[y][x];
				tile.type = ++tile.type % 4;
			}
			imgEditor.curpos = {
				'x': x,
				'y': y
			};
			imgEditor.Render();
		}
	});

	imgEditor.Render = function() {
		imgEditor.Clear();
		var w = imgEditor.size.w,
			h = imgEditor.size.h,
			bx = 0,
			by = 0;
		if(w > h * 2) {
			var sclx = w,
				scly = wh * sclx;
		} else {
			var scly = h,
				sclx = scly / wh;
		}

		for(var y in imgEditor.array)
			for(var x in imgEditor.array[y]) with(imgEditor.array[y][x]) {
				x *= 1;
				y *= 1;
				imgEditor.DrawImage([imgEditor.imgs.Gerade, imgEditor.imgs.Kurve, imgEditor.imgs.Ende, null][type], (x) / sclx, (y - by) / scly, 1 / sclx, 1 / scly, 90 * angle);
			}
		imgEditor.DrawImage(imgEditor.imgs.Mark, (imgEditor.curpos.x) / sclx, (imgEditor.curpos.y - by) / scly, 1 / sclx, 1 / scly, 0);
		imgEditor.Update();
	}
	layEdit.AddChild(imgEditor);

	imgEditor.imgs = {
		'Gerade': app.CreateImage('Img/Gerade.png'),
		'Kurve': app.CreateImage('Img/Kurve.png'),
		'Ende': app.CreateImage('Img/Ende.png'),
		'Mark': app.CreateImage('Img/Mark.png')
	};
	layMain.AddChild(layEdit);


	layGame = app.CreateLayout('absolute');
	layGame.SetVisibility('Hide');

	glGame = app.CreateGLView(1, 1, 'Fast2D');
	glGame.SetOnTouchDown(glOnTouchDown);
	layGame.AddChild(glGame);

	var txtGameCoins = app.CreateText('c: 0');
	txtGameCoins.SetTextSize(40);
	txtGameCoins.SetFontFile('Font.ttf');
	txtGameCoins.SetTextColor('black');
	txtGameCoins.SetPosition(.01, .01);
	updGameCoins = function(n) {
		txtGameCoins.SetText('c: ' + n)
	};
	layGame.AddChild(txtGameCoins);

	var layEffects = app.CreateLayout('Linear');
	layEffects.SetPosition(.2, .05);
	addEffect = function(effect) {
		var data = effect.split(' ');
		var lay = app.CreateLayout('linear');
		lay.SetBackColor('#aaffffff');
		lay.SetSize(.4, .08);
		lay.siz = 1;
		var txt = app.CreateText(data[0] + ' velocity ' + (data[1] == '+' ? 'increased' : 'decreased'));
		txt.SetTextColor('black');
		lay.AddChild(txt);

		var img = app.CreateImage(null, .2, .01);
		img.SetBackColor('#0088aa');
		img.SetPaintColor('#aa000000');
		img.SetMargins(.01, 0, .01, .01);
		lay.AddChild(img);

		lay.endEffect = function() {
			app.Execute(str + (data[1] == '-' ? '*' : '/') + '=1.5;');
			clearInterval(lay.itv);
			animate(lay, 'SlideToTop', function() {
				lay.SetVisibility('gone');
				layEffects.DestroyChild(lay);
			});
		}

		var str = '';
		str = data[0] == 'Ball' ? 'ball.v' : 'rotv';
		app.Execute(str + (data[1] == '+' ? '*' : '/') + '=1.5;');

		lay.itv = setInterval(function() {
			img.DrawRectangle(1, 0, lay.siz -= .01, 1);
			if(lay.siz <= 0) lay.endEffect();
		}, 50);

		layEffects.AddChild(lay);
	}

	closeEffects = function() {
		var children = [],
			obj, order;
		for(var id in _map) {
			obj = _map[id];
			order = layEffects.GetChildOrder(obj);
			if(order > -1) {
				obj.zorder = order;
				children.push(obj);
			}
		}
		children.forEach(function(effect) {
			effect.siz = 0;
			effect.endEffect();
		});
	}

	layGame.AddChild(layEffects);
	layMain.AddChild(layGame);

	player = app.CreateMediaPlayer();
	player.SetFile('Snd/Camden Feelings.mp3');
	player.SetVolume(2, 2);
	player.SetLooping(true);

	showHomeMenu = function() {
		animate(layHome, 'FadeIn', null, 2000);
		animate(laySplash, 'FadeOut', null, 2000);
	}

	arrowsToFront = function() {
		layLevels.ChildToFront(btnLeft);
		layLevels.ChildToFront(btnRight);
	}

	app.EnableBackKey(false);
	OnBack = function() {
		if(layGame.IsVisible()) {
			var ynd = app.CreateYesNoDialog('Do you really want to leave the game?', 'ShowNow');
			ynd.SetOnTouch(function(reply) {
				if(reply == 'Yes') drop(false);
			});
		} else if(layEdit.IsVisible()) {
			var ynd = app.CreateYesNoDialog('Do you want to save this map?', 'ShowNow');
			ynd.SetOnTouch(function(reply) {
				if(reply == 'Yes') {
					var arr = imgEditor.array,
						w = imgEditor.size.w,
						str = w + '1|',
						data = [];

					arr.forEach(function(row) {
						data.push('');
						row.forEach(function(tile) {
							data[data.length - 1] += tile.type;
						});
					});

					for(var i in data) data[i] = parseInt(data[i], 4).toString(36);
					str += data;
					app.WriteFile(app.GetPrivateFolder('ownLevel') + '/' + (app.ListFolder(app.GetPrivateFolder('ownLevel')).length + 1), str);
				}
				animate(layEdit, 'FadeOut');
			});
		} else if(laySettings.IsVisible()) animate(laySettings, 'SlideToTop');
		else if(layShop.IsVisible()) animate(layShop, 'SlideToBottom');
		else if(layLevels.IsVisible()) animate(layLevels, 'SlideToRight', null, 500);
		else {
			var ynd = app.CreateYesNoDialog('Do you really want to close the app?', 'ShowNow');
			ynd.SetOnTouch(function(reply) {
				if(reply == 'Yes') app.Exit()
			});
		}
	}

	animate = function(lay, type, callb, time) {
		app.DisableKeys('BACK');
		layMain.SetTouchable(false);
		callb = callb || none;
		time = time || 500;
		lay.Animate(type, callb, time);
		setTimeout(function() {
			app.DisableKeys('');
			layMain.SetTouchable(true);
		}, time + 100);
	}

	loadImages();
	loadLevels(app.GetPrivateFolder('Level'));
	initDialogs();

	app.AddLayout(layMain);
	layLvGrid.Show();

	//app.ShowPopup( "ready" );
	//setTimeout(gifready,1000)
	gifready();
}

/*********************************************\
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
\*********************************************/

function gifready() {
	setTimeout(showHomeMenu, 1000);
	/*setTimeout(function(){
		gif.SetVisibility('Gone');
		gif.Destroy();
	},3000);*/
}

function OnPause() {
	app.Exit()
};

function initDialogs() {
	dlgMore = app.CreateDialog('More games from Symbroson');
	var layMore = app.CreateLayout('Linear');
	web = app.CreateWebView(.55, .6);
	web.SetOnError(function(e) {
		app.ShowPopup('enable WiFi')
	});
	layMore.AddChild(web);

	var layH = app.CreateLayout('Linear', 'Horizontal');
	var btnWebBack = app.CreateButton('[fa-reply]', -1, -1, 'fontawesome');
	btnWebBack.SetOnTouch(function() {
		if(web.CanGoBack()) web.Back()
	});
	layH.AddChild(btnWebBack);
	layMore.AddChild(layH);
	dlgMore.AddLayout(layMore);
}

function loadLevels(fld) {
	LvlLst = {
		'btns': [],
		'cur': 0
	};
	layLevels.DestroyChild(layLvGrid);
	layLvGrid = app.CreateLayout('absolute');
	layLvGrid.SetPosition(.2, .3);
	layLvGrid.SetVisibility('Hide');
	var levels = app.ListFolder(fld).sort(function(a, b) {
		return a * 1 > b * 1 ? 1 : -1
	});
	if(!levels.length) return;

	var i = layLevels.page * 10
	do {
		var stat = app.ReadFile(fld + '/' + levels[i]).charAt(1);
		var btn = newButton('Level' + stat, .1, .1 / wh, -1, (btnChLvls.Text == 'Own') ? null : function() {
			this.SetScale(1, 1);
			tindex = i;
			var dlgM = app.CreateDialog('', 'notitle,ShowNow');
			var layDlgM = app.CreateLayout('Linear', 'Horizontal');
			layDlgM.SetBackColor('white');

			var btnUpload = newButton('  [fa-upload]', wh / 3, .2, 50, function() {
				var address = 'http://pipetracker.bplaced.net/iface/';

				var dlg = app.CreateDialog('', 'notitle,ShowNow');
				var layDlg = app.CreateLayout('absolute');
				layDlg.SetSize(.4, .7);

				var tabs = app.CreateTabs('Upload,Register', .4, .7);
				var layA = tabs.GetLayout('Upload');
				edtLevel = app.CreateTextEdit('', .3);
				edtLevel.SetHint('Level name');
				layA.AddChild(edtLevel);

				var edtNameA = app.CreateTextEdit('', .3, -1, 'utf8');
				edtNameA.SetHint('Username');
				layA.AddChild(edtNameA);

				var edtPassA = app.CreateTextEdit('null', .3, -1, 'password,utf8');
				edtPassA.SetHint('Password');
				edtPassA.SetVisibility('Hide'); //$
				layA.AddChild(edtPassA);

				var btnUpload = app.CreateButton('Upload', .2);
				btnUpload.SetOnTouch(function() {
					var login = address + 'user.iface.php?action=login&name=' + encodeURI(edtNameA.GetText()) + '&pw=' + encodeURI(edtPassA.GetText())
					app.HttpRequest('get', login, '', '', function(a, reply) {
						if(reply.indexOf('No address associated with hostname') > 0) {
							app.ShowPopup('No Internet connection!');
							return
						}
						if(reply == 'exception.login') {
							app.ShowPopup('Wrong username or password');
							return
						}
						if(reply.indexOf('exception') > -1) {
							app.ShowPopup('Error: ' + reply);
							return
						};
						var logout = 'http://pipetracker.bplaced.net/iface/user.iface.php?action=logout&token=' + reply,
							upload = 'http://pipetracker.bplaced.net/iface/level.iface.php?action=upload&token=' + reply + '&name=' + edtLevel.GetText();

						var httpRequest = new XMLHttpRequest();
						httpRequest.onreadystatechange = function() {
							if(httpRequest.readyState == 4) {
								if(httpRequest.status == 200) app.ShowPopup('Uploaded');
								else app.ShowPopup('Fehler: ' + httpRequest.status + ' ' + httpRequest.responseText);
								app.HttpRequest('get', logout, '', '');
								app.HideProgress();
							}
						};
						httpRequest.open('post', upload, true);
						httpRequest.send(app.ReadFile(app.GetPrivateFolder('ownLevel') + '/' + tindex));
						app.ShowProgress('Uploading...');
					});
				});
				layA.AddChild(btnUpload);

				var layR = tabs.GetLayout('Register');
				var btnRegister = app.CreateButton('Register[fa-arrow-right]', -1, -1, 'fontawesome');
				btnRegister.SetOnTouch(function() {
					var ynd = app.CreateYesNoDialog('Would you like to register in the level database? You will leave Pipe Tracker.', 'ShowNow');
					ynd.SetOnTouch(function(reply) {
						if(reply == 'Yes') {
							app.OpenUrl('http://pipetracker.bplaced.net/register.php');
							app.Exit();
						}
					});
				});
				btnRegister.SetMargins(.01, .15);
				layR.AddChild(btnRegister);
				/*
				var edtNameR=app.CreateTextEdit('',.3);
					edtNameR.SetHint('Benutzername');
					layR.AddChild(edtNameR);
					
					var edtPassR=app.CreateTextEdit('',.3,-1,'password');
					R.SetHint('Passwort');
					layR.AddChild(edtPassR);//$
					
					var edtEmail=app.CreateTextEdit('',.3);
					edtEmail.SetHint('Email');
					layR.AddChild(edtEmail);
					
					var btnRegister=app.CreateButton('Registrieren',.2);
					btnRegister.SetOnTouch(function(){
						app.ShowPopup('nicht registriert');
						//app.Exit()//$
					});
					layR.AddChild(btnRegister);
				*/
				layDlg.AddChild(tabs);
				dlg.AddLayout(layDlg);
				dlg.Show();
				dlgM.Hide();
			});
			layDlgM.AddChild(btnUpload);
			btnUpload.SetMargins(.05, .05);

			btnDelete = newButton('  [fa-trash]', wh / 3, .2, 50, function() {
				var ynd = app.CreateYesNoDialog('Do you really want to delete this level?', 'ShowNow');

				ynd.SetOnTouch(function(reply) {
					if(reply == 'Yes') {
						dlgM.Hide();
						app.DeleteFile(app.GetPrivateFolder('ownLevel') + '/' + i);
						loadLevels(app.GetPrivateFolder('ownLevel'));
						layLvGrid.Show();
						app.ShowPopup('Deleted');
					}
				});
			});
			btnDelete.SetMargins(.05, .05, .05, .05);
			layDlgM.AddChild(btnDelete);
			dlgM.AddLayout(layDlgM);
			dlgM.Show();
		}, levels[i]);
		btn.SetPosition((i % 5) / 8, Math.floor((i - layLevels.page * 10) / 5) / 4);
		layLvGrid.AddChild(btn);
		btn.index = i;
		LvlLst.btns.push(btn);
		i++;
	} while (i % 11 < 10 && i < levels.length);

	layLevels.AddChild(layLvGrid);
	arrowsToFront();
}

function switchPage(obj) {
	var add = obj.diff;
	if(layLevels.page + add < 0 || layLevels.page + add >= Math.ceil(app.ListFolder(app.GetPrivateFolder(btnChLvls.Text == 'Own' ? 'Level' : 'ownLevel')).length / 10)) return;

	layLevels.page += 1 * add;

	animate(layLvGrid, 'SlideTo' + ['Right', 'Left'][(add + 1) / 2],
		function() {
			loadLevels(app.GetPrivateFolder(btnChLvls.Text == 'Own' ? 'Level' : 'ownLevel'));
			animate(layLvGrid, 'SlideFrom' + ['Left', 'Right'][(add + 1) / 2], null, 500)
		}, 500);
}

function newButton(name, width, height, tsiz, callback, opt) {
	var btn, sclx = (opt == -1) ? -1 : 1;
	if(app.FileExists('Btn/' + name + '.png')) {
		btn = app.CreateImage(null, width, height);
		btn.SetBackground('Btn/' + name + '.png');
		btn.SetAutoUpdate(false);

		if(name.slice(0, 5) == 'Level') {
			btn.SetFontFile('Font.ttf');
			btn.SetPaintColor('black');
			btn.Level = opt;
			if(callback) btn.SetOnLongTouch(callback);
			btn.callback = loadLevel;
			btn.updImg = function(name) {
				btn.Clear();
				btn.SetBackground('Btn/Level' + name + '.png');
				if('12'.indexOf(name) > -1) {
					var len = opt.length;
					var siz = 80 - 20 * len
					btn.SetTextSize(siz);
					btn.DrawText(opt, .35 - len / 10, .85 - len / 10);
				}
				btn.Update();
			}
			btn.updImg(name.slice(-1));
		} else btn.callback = callback;
	} else {
		btn = app.CreateImage(null, width, height, 'fontawesome');
		btn.SetBackground('Btn/Button.png');
		if(name.indexOf('[fa-') == -1) btn.SetFontFile('Font.ttf');
		btn.callback = callback;
		btn.SetPaintColor('black');
		btn.SetText = function(name) {
			btn.Clear();
			btn.Text = name
			len = name.length
			btn.SetTextSize(tsiz);
			btn.DrawText(name, .12, .7);
			btn.Update();
		}
		btn.SetText(name);
	}
	btn.SetOnTouchDown(function() {
		btn.SetScale((sclx * .9), (1 * .9))
	});
	btn.SetOnTouchUp(function() {
		btn.SetScale(sclx, 1);
		btn.callback(btn)
	});
	return btn;
}

function loadImages() {
	Gerade = glGame.CreateImage('Img/Gerade.png');
	Kurve = glGame.CreateImage('Img/Kurve.png');
	Ende = glGame.CreateImage('Img/Ende.png');
	Ball = glGame.CreateImage('Img/Skins/' + app.LoadText('Skins').split(',')[0] + '.png');
	Back = glGame.CreateImage('Img/Back.png');
	Mark = glGame.CreateImage('Img/Mark.png');
	Wall = glGame.CreateImage('Img/Wall.png');
}

function loadLevel(obj) {
	app.DisableKeys('BACK');
	level = getLevel(obj.Level);
	LvlLst.cur = obj.index;
	if(level.status == 0) {
		app.ShowPopup('Play all previous levels first!');
		return;
	}
	layLvGrid.SetTouchable(false);
	level[0][0].angle = 1;
	var free = -1;
	level.forEach(function(row) {
		row.forEach(function(tile) {
			if([0, 1].indexOf(tile.type) > -1) free++
		});
	});
	items = [];
	var coinc = Math.floor(Math.pow(free, .6))
	free -= coinc
	var restc = Math.floor(Math.pow(coinc / 4, .7));
	if(restc == 0 && free > 6) restc = 1;
	addItem('Coin', coinc);
	addItem('Rotations +', restc);
	addItem('Rotations -', restc);
	addItem('Ball +', restc);
	addItem('Ball -', restc);

	items.forEach(function(item) {
		for(var c = 0; c < item.max; c++) {
			do {
				var x = ranInt(level[0].length - 1),
					y = ranInt(level.length - 1);
			} while (level[y][x].item || (!x && !y) || [2, 3].indexOf(level[y][x].type) > -1);
			level[y][x].item = item;
		}
	});
	updGameCoins(gameCoins);
	setHomeVis('Hide');
	animate(layLevels, 'FadeOut', function() {
		setTimeout(startGame, 1000);
	}, 1000);
}

function getLevel(n) {
	var data = app.ReadFile(app.GetPrivateFolder(btnChLvls.Text == 'Own' ? 'Level' : 'ownLevel') + '/' + n).split('|'),
		format = '';
	for(var i = 0; i < parseInt(data[0][0], 36); i++) format += '0';
	var lvl = [],
		lst = data[1].split(',');
	for(var y in lst) {
		var row = ((format + (1 * parseInt(lst[y], 36)).toString(4)).slice(-data[0][0])).split('');
		lvl.push([]);
		row.forEach(function(pipe) {
			lvl[y].push(newTile(pipe))
		});
	};
	lvl['status'] = data[0][1] * 1;
	return lvl;
}

function drop(n) {
	clearInterval(itvRender);
	player.Stop();
	var hidescore = function() {
		layGame.SetVisibility('gone');
		dlg.Hide();

		animate(layLevels, 'FadeIn', function() {
			setHomeVis('Show')
			if(n) {
				var btnT = LvlLst.btns[LvlLst.cur + 1] || false;
				if(btnT)
					if(app.ReadFile(app.GetPrivateFolder('Level') + '/' + btnT.Level)[1] == '0') {
						LvlLst.btns[LvlLst.cur].updImg('2');
						app.Wait(1);
						btnT.updImg('1~');
						app.Wait(1);
						btnT.updImg('1');

						[LvlLst.btns[LvlLst.cur], btnT].forEach(function(btn) {
							var data = app.ReadFile(app.GetPrivateFolder('Level') + '/' + btn.Level);
							if(data[1] * 1 < 2) data = data[0] + (data[1] * 1 + 1) + data.slice(-(data.length - 2));
							app.WriteFile(app.GetPrivateFolder('Level') + '/' + btn.Level, data);
						});
					}

				if(!btnT && btnChLvls.Text == 'Own') {
					alert('\t\t\t\t\t\t\tCongratulations!!!\n\n\t\t\tDu completed all levels!\n\n\n\t\t\t\t\t\t\t\t\t\t\t\tCredits\n\n\nDeveloper: Alex\nTeamname: Symbroson\nTeamstrength:1\n' +
						'Development time: 68h?\n\n\n\nContributors:\nMusic: jukedeck.com\nLeveldesigner: Leon\nLevel database: Techel\n\n\n\nc Symbroson Development');
					btn = LvlLst.btns[LvlLst.cur];
					var data = app.ReadFile(app.GetPrivateFolder('Level') + '/' + btn.Level);
					if(data[1] * 1 < 2) data = data[0] + (data[1] * 1 + 1) + data.slice(-(data.length - 2));
					app.WriteFile(app.GetPrivateFolder('Level') + '/' + btn.Level, data);
					btn.updImg('2');

					var quest = questCondLst[questCondLst.length - 1];
					var txt = app.ReadFile(app.GetPrivateFolder('Quests') + '/' + quest.name);
					txt[0] = '1';
					app.WriteFile(app.GetPrivateFolder('Quests') + '/' + quest.name, txt);
					updQuestList();
				}
			}
			layLvGrid.SetTouchable(true);
		}, 1000);

		updCoins(Coins += gameCoins);
		gameCoins = 0;
		app.SaveNumber('Coins', Coins);
	}

	var dlg = app.CreateDialog('', 'noTitle,noCancel');
	var lay = app.CreateLayout('absolute');
	var bck = app.CreateImage(null, .5, .9);
	bck.SetColor('white');
	bck.SetLineWidth(5);
	bck.SetPaintStyle('line');
	bck.SetPaintColor('black');
	bck.DrawRectangle(0, 0, 1, 1);
	lay.AddChild(bck);

	var txtHead = app.CreateText(n ? 'Completed' : 'lost');
	txtHead.SetTextColor('black');
	txtHead.SetFontFile('Font.ttf');
	txtHead.SetTextSize(50);
	txtHead.SetScale(0, 1);
	txtHead.SetPosition(n ? .03 : .06, .1);
	lay.AddChild(txtHead);

	var txtEcoins = app.CreateText('c: ' + gameCoins);
	txtEcoins.SetTextColor('black');
	txtEcoins.SetFontFile('Font.ttf');
	txtEcoins.SetTextSize(30);
	txtEcoins.SetPosition(.06, .25);
	lay.AddChild(txtEcoins);

	var dtime = Math.floor((new Date().getTime() - startTime) / 1000)
	var h = Math.floor(dtime / 3600);
	dtime -= h * 3600;
	var m = Math.floor(dtime / 60);
	dtime -= m * 60;
	var s = dtime;

	var txtTime = app.CreateText('Zeit: ' + (h ? h + ':' : '') + (m ? m + ':' : '') + s + (h ? ' h' : m ? ' min' : ' sec'));
	txtTime.SetTextColor('black');
	txtTime.SetFontFile('Font.ttf');
	txtTime.SetTextSize(30);
	txtTime.SetPosition(.06, .35);
	lay.AddChild(txtTime);

	var btnOk = newButton(' Ok', .15, .15, 40, hidescore);
	btnOk.SetPosition(.17, .6);
	btnOk.SetTouchable(false);
	lay.AddChild(btnOk);
	dlg.AddLayout(lay);
	dlg.Show();

	closeEffects();

	for(var i = 0; i < Math.PI / 2; i += Math.PI / 50)
		txtHead.SetScale(Math.sin(i), 1);

	if(btnChLvls.Text == 'Own') {
		var chd = false;
		questCondLst.forEach(function(quest) {
			if(eval(quest.cond)) {
				chd = true;
				var txt = app.ReadFile(app.GetPrivateFolder('Quests') + '/' + quest.name);
				app.WriteFile(app.GetPrivateFolder('Quests') + '/' + quest.name, '1' + txt.slice(1 - txt.length));
			}
		});
		if(chd) updQuestList();
	}

	if(!n && gameCoins) {
		var tcoins = gameCoins;
		gameCoins = Math.round(Math.pow(gameCoins, .8));
		for(var i = tcoins; i >= gameCoins; i--) {
			txtEcoins.SetText('c: ' + i);
			app.Wait(.5 / (i - gameCoins + 1));
		}
	}

	btnOk.SetTouchable(true);
}

function startGame() {
	ball = {
		'cx': 0,
		'cy': 0,
		'px': 0,
		'py': 0,
		'walk': 0,
		'dir': 3,
		'v': 0
	}
	pos = newPos(1, 0, 3);
	items.forEach(function(item) {
		item.count = 0
	});
	redraw();
	layGame.Show();
	startTime = new Date().getTime();
	setTimeout(function() {
		ball.v = f * .008;
		player.Play();
		app.DisableKeys('');
	}, 2000);
	itvRender = setInterval(redraw, 20);
}

function redraw() {
	glGame.DrawImage(Back, 0, 0, 1, 1, 0);
	if(!moveBall()) return;

	var w = level[0].length,
		h = level.length,
		bx = ball.cx + ball.px - 3.5,
		by = ball.cy + ball.py - 2.5,
		sclx = 9,
		scly = wh * sclx;


	for(var y in level)
		for(var x in level[y])
			if(x - bx < 9 && x - by > -9 && y - by < 6 && y - by > -6) with(level[y][x]) {
				x *= 1;
				y *= 1;

				if(rotate) {
					angle += rotv;
					if(angle >= target) {
						angle = target % 4;
						rotate = false;
					}
				}

				glGame.DrawImage([Gerade, Kurve, Ende, Wall][type], (x - bx) / sclx, (y - by) / scly, 1 / sclx, 1 / scly, 90 * angle);

				if(item) {
					var scl = (item.name == 'Coin') ? Math.sin(framecount / 20) : 1
					if(type) {
						var a = -Math.PI * (angle + 1.5) / 2;
						var rdx = -.2 * Math.sin(a);
						var rdy = -.2 * Math.cos(a);
						glGame.DrawImage(item.img, (rdx + x - scl / 2 + .5 - bx) / sclx, (rdy + y - by) / scly, scl / sclx, 1 / scly, 0);
					} else glGame.DrawImage(item.img, (x - scl / 2 + .5 - bx) / sclx, (y - by) / scly, scl / sclx, 1 / scly, 0);
				}
			}
	glGame.DrawImage(Ball, .5 - 1.5 / sclx, .5 - .5 / scly, 1 / sclx, 1 / scly, 0);

	glGame.DrawImage(Mark, (pos.x - bx) / sclx, (pos.y - by) / scly, 1 / sclx, 1 / scly, 0);
	glGame.Render();
	framecount++;
}

function glOnTouchDown() {
	if(!level[pos.y]) return;
	var pipe = level[pos.y][pos.x];
	if(!pipe) return;
	if(pipe.rotate) return;
	pipe.rotate = true;
	pipe.target = pipe.angle + 1;
}

function moveBall() {
	if(ball.walk >= 1) {
		ball.walk = 0;
		var p = nextPipe(newPos(ball.cx, ball.cy, ball.dir));
		if(!level[p.y]) {
			drop(false);
			return 0
		} else if(!level[p.y][p.x]) {
			drop(false);
			return 0
		} else if(level[p.y][p.x].type == 3) {
			drop(false);
			return 0
		} else if(level[p.y][p.x].rotate) {
			drop(false);
			return 0
		};

		ball.cx = p.x;
		ball.cy = p.y;
		ball.dir = p.dir;
		pos = nextPipe(p);
	}

	var pipe = level[ball.cy][ball.cx]

	if(ball.walk > .3 && pipe.item) {
		if(pipe.item.name == 'Coin')
			updGameCoins(gameCoins += 10);
		else addEffect(pipe.item.name);
		pipe.item.count++;
		pipe.item = null;
	}

	if(pipe.type == 0) { //gerade
		if(pipe.angle % 2 != ball.dir % 2) {
			drop(false);
			return 0
		}
		switch(ball.dir) {
			case 0:
				ball.px = .5;
				ball.py = ball.walk;
				break;
			case 1:
				ball.py = .5;
				ball.px = 1 - ball.walk;
				break;
			case 2:
				ball.px = .5;
				ball.py = 1 - ball.walk;
				break;
			case 3:
				ball.py = .5;
				ball.px = ball.walk;
				break;
		}
	} else if(pipe.type == 2) { //ende
		if(ball.dir % 4 != pipe.angle % 4) {
			drop(false);
			return 0
		} else if(ball.walk >= .5) drop(true);
		else switch(ball.dir) {
			case 0:
				ball.px = .5;
				ball.py = ball.walk;
				break;
			case 1:
				ball.py = .5;
				ball.px = 1 - ball.walk;
				break;
			case 2:
				ball.px = .5;
				ball.py = 1 - ball.walk;
				break;
			case 3:
				ball.py = .5;
				ball.px = ball.walk;
				break;
		}
	} else { //kurve
		switch(pipe.angle % 4) {
			case 0:
				if(ball.dir == 1) {
					ball.px = 1 + .5 * Math.sin(-ball.walk * Math.PI / 2);
					ball.py = 1 - .5 * Math.cos(-ball.walk * Math.PI / 2);
				} else if(ball.dir == 2) {
					ball.px = 1 - .5 * Math.sin((ball.walk + 1) * Math.PI / 2);
					ball.py = 1 + .5 * Math.cos((ball.walk + 1) * Math.PI / 2);
				} else {
					drop(false);
					return 0
				}
				break;

			case 1:
				if(ball.dir == 2) {
					ball.px = .5 * Math.sin(-(ball.walk + 3) * Math.PI / 2);
					ball.py = 1 - .5 * Math.cos(-(ball.walk + 3) * Math.PI / 2);
				} else if(ball.dir == 3) {
					ball.px = -.5 * Math.sin((ball.walk + 2) * Math.PI / 2);
					ball.py = 1 + .5 * Math.cos((ball.walk + 2) * Math.PI / 2);
				} else {
					drop(false);
					return 0
				}
				break;

			case 2:
				if(ball.dir == 3) {
					ball.px = .5 * Math.sin(-(ball.walk + 2) * Math.PI / 2);
					ball.py = -.5 * Math.cos(-(ball.walk + 2) * Math.PI / 2);
				} else if(ball.dir == 0) {
					ball.px = .5 * Math.sin((ball.walk + 1) * Math.PI / 2);
					ball.py = -.5 * Math.cos((ball.walk + 1) * Math.PI / 2);
				} else {
					drop(false);
					return 0
				}
				break;

			case 3:
				if(ball.dir == 0) {
					ball.px = 1 + .5 * Math.sin(-(ball.walk + 1) * Math.PI / 2);
					ball.py = -.5 * Math.cos(-(ball.walk + 1) * Math.PI / 2);
				} else if(ball.dir == 1) {
					ball.px = 1 + .5 * Math.sin((ball.walk + 2) * Math.PI / 2);
					ball.py = -.5 * Math.cos((ball.walk + 2) * Math.PI / 2);
				} else {
					drop(false);
					return 0
				}
				break;
		}
	}
	ball.walk += ball.v;
	return 1;
}

function nextPipe(p) {
	if(!level[p.y]) return {
		'x': -1,
		'y': -1
	};
	if(!level[p.y][p.x]) return {
		'x': -1,
		'y': -1
	};

	var pipe = level[p.y][p.x]
	if(pipe.type == 1)
		switch(pipe.angle % 4) {
			case 0:
				p.dir = 3 * p.dir - 3;
				break;
			case 1:
				p.dir = -p.dir + 3;
				break;
			case 2:
				p.dir = p.dir / 3 + 1;
				break;
			case 3:
				p.dir = -p.dir + 3;
				break;
		}

	switch(p.dir) {
		case 0:
			p.y++;
			break;
		case 1:
			p.x--;
			break;
		case 2:
			p.y--;
			break;
		case 3:
			p.x++;
			break;
	}
	return newPos(p.x, p.y, p.dir)
}