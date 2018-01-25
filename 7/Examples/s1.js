function classMain(x) {
    this.x = x
}
 
classMain.prototype.func1 = function() {
app.ShowPopup("I'm func1")
}
  
classMain.prototype.func2 = function() {}
 
inst = new classMain("arg")
function OnStart() {inst.func1()}