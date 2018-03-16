/* 
 * CSAPI 0.5
 * by Vlad Cheater
 */

function smoothColors(colors){
  var _colors = []
  if(typeof(colors)=="object")var _ic = colors
  if(typeof(colors)=="string")var _ic = colors.split(",")
  
  if(_ic.length==1)_ic.push(_ic[0])
  _ic.forEach(function(i, n){
	  _ic[n] = rgb(i)
	})
	
	for(var a = 0; a<_ic.length-1; a++){
	  var _ti = false
	  var _fc = _ic[a+1]
	  var _tc = _ic[a]
  	for(var b = 0; !_ti; b++){
  	  _colors.push(hex(_tc[0],_tc[1],_tc[2]))
      _tc.forEach(function(i, n){
        if(i<_fc[n])_tc[n]++
        if(i>_fc[n])_tc[n]--
      })
      if(_tc.join("")==_fc.join("")){
        _ti=true
        _colors.push(hex(_tc[0],_tc[1],_tc[2]))
      }
	  }
	}
	return _colors
}

function rgb(c){
  c=c.slice(1).match(/.{2}/g)
  c[0]=parseInt(c[0], 16)
  c[1]=parseInt(c[1], 16)
  c[2]=parseInt(c[2], 16)
  return c
}

function hex(r,g,b){  
  r = r.toString(16)
  g = g.toString(16)
  b = b.toString(16)
  if(r.length==1)r="0"+r
  if(g.length==1)g="0"+g
  if(b.length==1)b="0"+b
  return "#"+r+g+b
}