app.LoadScript('selection_list.js');
app.LoadScript('multi_selection_list.js');

app.SetOrientation('portrait');


function OnStart() {
	var lay = app.CreateLayout('linear', 'fillxy, vcenter');
	lay.SetBackground("/Res/drawable/pattern_carbon", "repeat");
	
	//экз. класса MultiSelectionList
	selList = new SelectionList();
	selList.icon_mark = 'Img/sl_on.png';
	selList.icon_unmark = 'Img/sl_off.png';
	selList.SetOnChange(onShangeSelList);
	selList.setIndex(1);
	var items = ['Пункт 1', 'Пункт 2', 'Пункт 3', 'Пункт 4'];
	//объект app.CreateList
	var sl = selList.createSelectionList(items, 0.88, -1, 'normal');
	lay.AddChild(sl);
	

	mulSelList = new    MultiSelectionList();
	mulSelList.icon_mark = 'Img/msl_on.png';
	mulSelList.icon_unmark = 'Img/msl_off.png';
	mulSelList.SetOnChange(onShangeMultiSelList);
	mulSelList.setIndexes([1, 3]);
	var items = ['Пункт 1', 'Пункт 2', 'Пункт 3', 'Пункт 4'];
	var msl = mulSelList.createMultiSelectionList(items, 0.88, -1, 'normal');
	msl.SetMargins(0, 0.01, 0, 0);
	
	
	lay.AddChild(msl);
	

	app.AddLayout(lay);
}




function onShangeSelList(item, index) {
	app.ShowPopup('item: ' + item + '\nindex: ' + index, 'short,bottom');
}


function onShangeMultiSelList(indexes) {
	app.ShowPopup(JSON.stringify(indexes), 'short,bottom');
}

