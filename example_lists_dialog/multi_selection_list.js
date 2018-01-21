

function MultiSelectionList() {
	this.icon_mark = '/Sys/Img/Hello.png';
	this.icon_unmark = '/Sys/Img/Icon.png';
	var indexes = [];
	var onChange = null;
	var listObject = null;
	var listItems = [];
	var self = this;
	
	
	
	this.createMultiSelectionList = function(list, w, h, options) {
		listItems = [];
	 	checkIndexes(indexes);
		var ls = [];
		for (var i=0; i<list.length; i++) {
			var item = list[i];
			listItems.push(item.split(':'));
			if (~indexes.indexOf(i)) {
				item += ':' + this.icon_mark;
			} else {
				item += ':' + this.icon_unmark;
			}
			ls.push(item);
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
	
	
	
	this.setIndexes = function(inds) {
		checkIndexes(inds);
	}
	
	
	
	this.getIndexes = function() {
		return indexes;
	}
	
	
	
	this.selectAll = function() {
		for (var i=0; i<listItems.length; i++) {
			if (indexes.indexOf(i) < 0) {
				indexes.push(i);
			}
		}
		updateList();
	}
	
	
	
	this.clearAll = function() {
		indexes = [];
		updateList();
	}
	
	
	
	var checkIndexes = function(inds) {
		if (!Array.isArray(inds))
			return;
		var temp = [];
		for (var i=0; i<inds.length; i++) {
			var x = inds[i];
			if (typeof x == 'number' 
				&& x >= 0 
				&& !listItems.length || x < listItems.length
				&& temp.indexOf(x) < 0) {
					temp.push(x);
			}
		}
		indexes = temp;
		if (listItems.length) updateList();
	}
	
	
	
	var updateList = function() {
		var ls = [];
		for (var i=0; i<listItems.length; i++) {
			var ic = ~indexes.indexOf(i) ? self.icon_mark : self.icon_unmark;
			var l = listItems[i];
			var item = '';
			for (var j=0; j<l.length; j++) {
				item += l[j] + ':';
			}
			ls.push(item + ic);
		}
		listObject.SetList(ls);
		if (typeof onChange == 'function') {
			onChange.call(listObject, indexes);
		}
	}
	
	
	
	var onTouch = function(title, body, icon, ind) {
		if (icon == self.icon_unmark) {
			var ic = self.icon_mark;
			indexes.push(ind);
		}
		else if (icon == self.icon_mark) {
			var ic = self.icon_unmark;
			indexes.splice(indexes.indexOf(ind), 1);
		}

		this.SetItemByIndex(
			ind, 
			listItems[ind][0].replace(/\^c\^/g, ':'), 
			listItems[ind][1]&&listItems[ind][1].replace(/\^c\^/g, ':'), 
			ic);

		if (typeof onChange == 'function') {
			onChange.call(this, indexes);
		}
	}

}


