app.LoadScript('selection_list.js');
app.LoadScript('multi_selection_list.js');

app.SetOrientation('portrait');


function OnStart() {
	var lay = app.CreateLayout('linear', 'fillxy, vcenter');
	lay.SetBackground("/Res/drawable/pattern_carbon", "repeat");
	
	//label
	var text = app.CreateText('SelectionList'.big(), 0.9,  -1, 'Multiline, Html');
	lay.AddChild(text);

	
	//instance MultiSelectionList
	selList = new SelectionList();
	
	//icons
	selList.icon_mark = 'Img/sl_on.png';
	selList.icon_unmark = 'Img/sl_off.png';
	selList.SetOnChange(onShangeSelList);

	//set start index
	selList.setIndex(1);

	//items list
	var items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

	//object app.CreateList
	var sl = selList.createSelectionList(items, 0.88, -1, 'normal');
	sl.SetMargins(0, 0, 0, 0.07);

	lay.AddChild(sl);
	

	var text = app.CreateText('MultiSelectionList'.big(), 0.9,  -1, 'Multiline, Html');
	lay.AddChild(text);


	mulSelList = new    MultiSelectionList();
	mulSelList.icon_mark = 'Img/msl_on.png';
	mulSelList.icon_unmark = 'Img/msl_off.png';
	mulSelList.SetOnChange(onShangeMultiSelList);
	mulSelList.setIndexes([1, 3]);
	var items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
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

