web = app.CreateWebView(1,1);
web.LoadUrl("https://www.google.com");
app.EnableBackKey(false);
res = Sav = sa = false;
Com = com = 'req get https://www.google.com\nreg pat res  (href|src)=".+?" gmi\n%%pat%% = %%pat%%.join("\\n\\n")\nrep pat  (href|src)=|" \nalert(%%pat%%)\n//tcp connect www.google.com\n//tcp send GET$/search$HTTP/1.1\\r\\nq=query;\\r\\n\\r\\n\n//alert(%%res%%)\n\n//Resource Extractor, by @ValentinHacker';
Con = app.CreateNetClient("TCP,Raw");
Con.SetOnConnect(function(conn) {
	ed = ed.split("\n");
	ed.splice(0,stp+1);
	ed = ed.join("\n");
	app.SaveCookies();
	if (!async) {
		Run();
	}
});
if (!app.FolderExists("scripts")) {
	app.MakeFolder("scripts");
	app.WriteFile(sa="scripts/script.txt",com);
	app.WriteFile("scripts/help.txt",app.ReadFile("Help.txt"));
}
scr = app.ListFolder("scripts",".txt");
if (!app.FolderExists("Data")) {
	app.MakeFolder("Data");
}
if (scr[0]&&!app.IsNewVersion()) {
	com = app.ReadFile("scripts/"+scr[0]);
	sa = "scripts/"+scr[0];
	app.ShowPopup(scr[0]+" opened.","Bottom");
} else {
	app.WriteFile("scripts/help.txt",app.ReadFile("Help.txt"));
}
app.MakeFolder("scripts");
app.MakeFolder("Data");
edt = app.CreateCodeEdit(com,1,.9,"VCenter,FillXY");
edt.SetText(com);
setInterval(function() {app.SetDebugEnabled(false);if (!app.IsKeyboardShown()) {edt.SetSize(1,.9);} else {edt.SetSize(1,.49);}app.SetDebugEnabled(true);},10);
edt.SetTextSize("25","px");
lay = app.CreateLayout("Linear","Center,FillXY");
btn = app.CreateLayout("Linear","Horizontal");
Fil = app.CreateLayout("Linear","Horizontal");
und = app.CreateButton("[fa-undo] Undo",.2,.1,"FontAwesome");
und.SetOnTouch(edt.Undo);
sav = app.CreateButton("[fa-save] Save",.2,.1,"FontAwesome");
sav.SetOnTouch(save);
ope = app.CreateButton("[fa-file] Open",.2,.1,"FontAwesome");
ope.SetOnTouch(open);
red = app.CreateButton("[fa-repeat] Redo",.2,.1,"FontAwesome");
red.SetOnTouch(edt.Redo);
run = app.CreateButton("[fa-play] Run",.2,.1,"FontAwesome");
run.SetOnTouch(function() {
	ed = edt.GetText();
	Dat = {res:false};
	Run();
});
fil = app.CreateList("",1,1);
fil.SetOnTouch(function(val) {
	edt.SetText(app.ReadFile(sa="scripts/"+val+".txt"));
	OnBack();
});
fil.SetOnLongTouch(function(val) {
	var Sa;
	app.DeleteFile(Sa="scripts/"+val+".txt");
	app.DeleteFile("Data/"+val+".htm");
	app.DeleteFile("Data/"+val+".txt");
	app.ShowPopup(val+".txt deleted.","Bottom");
	if (Sa==sa) {
		sa = false;
	}
	open();
});
btn.AddChild(und);
btn.AddChild(sav);
btn.AddChild(ope);
btn.AddChild(red);
btn.AddChild(run);
lay.AddChild(edt);
lay.AddChild(btn);
Fil.AddChild(fil);
app.AddLayout(lay);
function save() {
	if (Sav||!sa) {
		var nam = prompt("Script Name");
		if (nam) {
			app.WriteFile(sa="scripts/"+nam+".txt",edt.GetText());
			app.ShowPopup(sa.replace(/^scripts\//,"")+" created.","Bottom");
		} else {
			sa = false;
		}
	} else {
		app.WriteFile(sa,edt.GetText());
		app.ShowPopup(sa.replace(/^scripts\//,"")+" saved.","Bottom");
	}
	Sav = true;
	setTimeout(function() {Sav=false;},500);
}
function open() {
	if (!scr) {
		save();
		return;
	}
	app.RemoveLayout(lay);
	app.AddLayout(Fil);
	OnBack = function() {
		app.RemoveLayout(Fil);
		app.AddLayout(lay);
		OnBack = function() {
			app.Exit();
		};
	};
	fil.RemoveAll();
	scr = app.ListFolder("scripts",".txt");
	scr.forEach(function(val) {
		fil.AddItem(val.match(/^.+?(?=\.txt$)/)[0]);
	});
}
function Run() {
	try {
		for (stp = 0; stp < (dat=ed.split("\n")).length; stp++) {
			var dt = dat[stp];
			(dt.match(/%%.*?%%/gmi)||[]).forEach(function(val) {
				dt = dt.replace(val,'Dat["'+val.replace(/%/gmi,"")+'"]');
			});
			(dt.match(/##.*?##/gmi)||[]).forEach(function(val) {
				dt = dt.replace(val,Dat[val.replace(/#/gmi,"")]);
			});
			if (/^reg/i.test(dt)) {
				var vr = dt.replace(/^reg /i,"").match(/^.+?(?=( |$))/g)[0];
				var Vr = dt.replace(/^reg .+? /i,"").match(/^.+?(?=( |$))/g)[0]||"res";
				var pat = (dt.match(/^reg .+? .+? .+?(?=( |$))/gi)||[""]).join("").replace(/(^reg .+? .+? )|$/i,"");
				var flg = (dt.match(/^reg .+? .+? .+? .+?(?=( |$))/gi)||[""]).join("").replace(/(^reg .+? .+? .+? )|$/i,"");
				var reg = new RegExp(pat,flg||"gmi");
				Dat[vr] = Dat[Vr].match(reg)||[""];
				app.WriteFile("Data/"+sa.replace(/^scripts\//,"").replace(/\.txt$/,"")+".txt",Dat[vr].join("\n\n"));
			} else if (/^a?req/i.test(dt)) {
				var prot = dt.replace(/^a?req /i,"").match(/^.+?(?=( |$))/g)[0];
				var url = dt.replace(/^a?req .+? /i,"").match(/^.+?(?=( |$))/g)[0];
				var path = (dt.match(/^a?req .+? .+? .+?(?=( |$))/ig)||[""]).join("").replace(/(^a?req .+? .+? )|$/i,"");
				var param = (dt.match(/^a?req .+? .+? .+? .+?(?=( |$))/gi)||[""]).join("").replace(/(^a?req .+? .+? .+? )|$/i,"");
				var head = (dt.match(/^a?req .+? .+? .+? .+? .+?(?=( |$))/gi)||[""]).join("").replace(/(^a?req .+? .+? .+? .+? )|$/i,"");
				var ret = /^a/i.test(dt)?true:false;
				app.HttpRequest(prot||"GET",url,path||"/",param?param:"",function(err,repl) {rep(err,repl,ret);},head);
				Dat.Url = url+path;
				Dat.Par = param;
				Dat.head = head;
				web.LoadUrl(url);
				if (!ret) {
					break;
					return;
				}
			} else if (/^rep/i.test(dt)) {
				var vr = dt.replace(/^rep /i,"").match(/^.+?(?=( |$))/g)[0];
				var pat = dt.replace(/^rep .+? /i,"").match(/^.+?(?=( |$))/g)[0];
				var rp = (dt.match(/^rep .+? .+? .+?(?=( |$))/i)||[""]).join("").replace(/(^rep .+? .+? )|$/i,"");
				var flg = (dt.match(/^rep .+? .+? .+? .+?(?=( |$))/i)||[""]).join("").replace(/(^rep .+? .+? .+? )|$/i,"")||"gmi";
				var reg = new RegExp(pat,flg||"gmi");
				Dat[vr] = (Dat[vr]||[""]).join("").replace(reg,rp?rp:"");
				app.WriteFile("Data/"+sa.replace(/^scripts\//,"").replace(/\.txt$/,"")+".txt",Dat[vr]);
			} else if (/^start$/i.test(dt)) {
				ed = ed.split("\n");
				ed.splice(0,stp);
				ed = ed.join("\n");
				stp = 0;
			} else if (/^loop$/i.test(dt)) {
				stp = 0;
			}	else if (/^loop \d+$/i.test(dt)) {
				var lp = Number(dt.match(/(\d|-)+/gmi).join());
				ed = ed.split("\n");
				ed[stp] = "loop "+(lp-1);
				if (lp>0) {
					stp = -1;
				} else {
					ed.splice(stp,1);
				}
				ed = ed.join("\n");
			} else if (/^a?tcp/i.test(dt)) {
				async = /^a/i.test(dt);
				dt = dt.replace(/^a?tcp( |$)/gi,"");
				var mod = dt.match(/^.+?(?=( |$))/i)[0];
				dt = dt.replace(/^.+?( |$)/gi,"");
				if (/^conn/i.test(mod)) {
					var con = dt.match(/^.+?(?=( |$))/i)[0];
					dt = dt.replace(/^.+?( |$)/gi,"");
					var port = (dt.match(/^.+?(?=( |$))/i)||[""])[0]||80;
					Con.Connect(Dat.Url=con,Dat.Port=port);
					if (!async) {
						return;
						break;
					}
				} else if (/^send/i.test(mod)) {
					var txt = (dt.match(/^.+?(?=( |$))/i)||[""])[0].replace(/\$/g," ").replace(/\\r/g,"\r").replace(/\\n/g,"\n");
					dt = dt.replace(/^.+?( |$)/gi,"");
					var md = (dt.match(/^.+?(?=( |$))/i)||["UTF-8"])[0];
					Con.SendText(txt,md);
					Dat.res = res = Con.ReceiveText(md);
					app.WriteFile("Data/"+sa.replace(/^scripts\//,"").replace(/\.txt$/,"")+".htm",res);
				} else if(/^byte/i.test(mod)) {
					var txt = (dt.match(/^.+?(?=( |$))/i)||[""])[0].replace(/\$/g," ").replace(/\\r/g,"\r").replace(/\\n/g,"\n");
					dt = dt.replace(/^.+?( |$)/gi,"");
					var md = (dt.match(/^.+?(?=( |$))/i)||["Hex"])[0];
					Con.SendBytes(txt,md);
					Dat.res = res = Con.ReceiveBytes(md);
					app.WriteFile("Data/"+sa.replace(/^scripts\//,"").replace(/\.txt$/,"")+".htm",res);
				} else if (/^dis/i.test(mod)) {
					Con.Disconnect();
				}
			}	else {
				eval(dt);
			}
		}
	}	catch (err) {
		alert(err.message);
	}
}
function rep(err,repl,ret) {
	if (err||!repl) {
		return false;
	}
	app.WriteFile("Data/"+sa.replace(/^scripts\//,"").replace(/\.txt$/,"")+".htm",repl);
	ed = ed.split("\n");
	ed.splice(0,stp+1);
	ed = ed.join("\n");
	Dat.res = res = repl;
	app.SaveCookies();
	if (!ret) {
		Run();
	}
}
function OnBack() {
	app.Exit();
}
function OnMenu() {
	app.SetClipboardText(edt.GetText());
	app.ShowPopup("Script copied to clipboard.","Bottom");
}
String.prototype.join = function(jn,sp) {
	return this.toString().split(sp?sp:"").join(jn?jn:"");
};