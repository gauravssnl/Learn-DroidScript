var list_layouts_complex_calculation_1 = []
function ComplexCalculation1(callback) {
  list_layouts_complex_calculation_1.push(app.CreateLayout("Linear", "Top,FillXY"));
  var lay = list_layouts_complex_calculation_1.slice(-1)[0];
  var lt = app.CreateLayout("Linear", "Horizontal,FillX");
  var ok = app.CreateButton('Добавить', 0.5, -1, 'gray');
  lt.AddChild(ok);
  var add = app.CreateButton('Готово', 0.5, -1, 'gray');
  lt.AddChild(add); 
  lay.AddChild(lt);
  params_complex_calculation_1 = app.ReadFile('files/complex_calculation_1.txt').slice(0, -1).split('\n');
  items_complex_calculation_1 = [];
  for(var i in params_complex_calculation_1) {
    items_complex_calculation_1[i] = params_complex_calculation_1[i].slice(0, -1); }
  var data = "";
  for(var i in items_complex_calculation_1)  data += items_complex_calculation_1[i] + ":Img/complexno.png,";
  lst_cc1 = app.CreateList(data, 1, -1, "WhiteGrad,FillY");
  lst_cc1.SetTextColor1("#555558");
  lst_cc1.SetTextMargins(0.04, 0, 0, 0);
  lst_cc1.SetOnTouch(lst_OnTouch);
  lay.AddChild(lst_cc1);
  app.AddLayout(lay);
  if(list_layouts_complex_calculation_1.length > 1) {
    app.RemoveLayout(list_layouts_complex_calculation_1[0]);
    list_layouts_complex_calculation_1.splice(0, 1) }
  list_select_complex_calculation_1 = [];
}

function lst_OnTouch(item){
  var index = items_complex_calculation_1.indexOf(item) ;
  var indexof = list_select_complex_calculation_1.indexOf(index);
  if(indexof == -1) {
    list_select_complex_calculation_1.push(index);
    lst_cc1.SetItem(item, item, '', 'Img/complexyes.png'); }
  else {
    list_select_complex_calculation_1.splice(indexof, 1);
    lst_cc1.SetItem(item, item, '', 'Img/complexno.png'); }
}


function OnStart() {ComplexCalculation1()}
