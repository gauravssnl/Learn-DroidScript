

function SelectionList() {
	this.icon_mark = '/Sys/Img/Hello.png';
	this.icon_unmark = '/Sys/Img/Icon.png';
	var index = 0;
	var onChange = null;
	var listObject = null;
	var listItems = [];
	var self = this;
	
	
	
	this.createSelectionList = function(list, w, h, options) {
		listItems = [];

		if (index < 0) index = 0;
		else if (index > list.length-1)
			index = list.length - 1;

		var ls = [];
		for (var i=0; i<list.length; i++) {
			var item = list[i];
			listItems.push(item.split(':'));
			var icon = (i==index ? this.icon_mark : this.icon_unmark);
			ls.push(item + ':' + icon);
		}

		listObject = app.CreateList(ls, w, h, options);
		listObject.SetOnTouch(function(t, b, i, ind) {
			onTouch.call(listObject, t, b, i, ind)
		});
		listObject.SetOnLongTouch(function(t, b, i, ind) {
			onTouch.call(listObject, t, b, i, ind)
		});

		return listObject;
	}



	this.SetOnChange = function(f) {
		if (typeof f == 'function') {
			onChange = f;
		}
	}
	
	
	
	this.setIndex = function(ind) {
		if (typeof ind != 'number') return;
		var index_;
		if (ind < 0) index_ = 0;
		else if (listItems.length && ind >= listItems.length)
			index_ = listItems.length-1;
		else index_ = ind;
		if (listItems.length) {
			onTouch.call(listObject, null, null, this.icon_unmark, index_, true);
		}
		index = index_;
	}
	
	
	
	this.getIndex = function() {
		return index;
	}
	
	
	
	var onTouch = function(title, body, icon, ind) {
		if (ind == index) return;
		
		title = listItems[ind][0].replace(/\^c\^/g, ':');
		body = listItems[ind][1]&&listItems[ind][1].replace(/\^c\^/g, ':');
		
		this.SetItemByIndex(ind, title, body, self.icon_mark);

		var i = listItems[index];
		this.SetItemByIndex(
			index, 
			i[0].replace(/\^c\^/g, ':'), 
			i[1]&&i[1].replace(/\^c\^/g, ':'), 
			self.icon_unmark,
			0, 0);

		if (typeof onChange == 'function') {
			onChange.call(this, title, ind);
		}

		index = ind;
	}

}