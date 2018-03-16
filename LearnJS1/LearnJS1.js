var myCar = new Object();
myCar.model = 'Mustang' ;
myCar.make = 'Ford';
myCar.year = 1969;

function showProps(obj, objName)
{
	var result = '';
	// traveses all enumerable properties of object and its prototype chain
	for(var i in obj)
	{
	   // obj.hasOwnProperty() is used to filter properties from object's prototype chain
	   if(obj.hasOwnProperty(i))
	     result += objName + '.' + i + ' = ' +obj[i] + "\n";
	}
	
	return result
}

alert(showProps(myCar, "myCar"));
// returns array with  own enumerable properties name(not prototype)
alert(Object.keys(myCar));
// properties' names enumerable or not 
alert(Object.getOwnPropertyNames(myCar));

// can be used to reveal hidden properties (which are not accessible through the object, because another property has the same name earlier in the prototype chain)

function listProps(o)
{
	var objToInspect;
	var result=[];
	
	for(objToInspect =o; objToInspect != null; objToInspect = Object.getPrototypeOf(objToInspect))
	 {
	    result = result.concat(Object.getOwnPropertyNames(objToInspect));
   }
 return result;
}

alert(listProps(myCar));

function Person(name, age, sex)
{
	this.name = name;
	this.age = age;
	this.sex = sex
}

var ram = new Person('Ram', 15, 'Male');
alert(ram.name);

var Animal = {
  type: 'InVertebrates' ,
  displayType: function ()
{
	 alert(this.type);
}

};

var animal1 = Object.create(Animal);
animal1.displayType();

// Add a property to previously defined object using prototype property

Person.prototype.color = null;
alert(ram.color);
ram.z = 5;
alert(showProps(ram,  "ram"));

// getters & setters
// var o is an object initializer
var o = {
  a : 7,
  get b() {
    return this.a + 1;
  },
  
  set c(x) {
    this.a = x / 2;
  }
 }
 
  alert(o.a);
  alert(o.b);
  o.c = 50
  alert(o.a);
  alert(o.c); // undefined
  
// Name a function in getter-setter by using Object.definrProperty / Object.prototype.__defineGetter__ (legacy)
// add year property to all instance of prefefined Date class
// uses Date class existing getFullYear & setFullYear method

var d = Date.prototype;
Object.defineProperty(d, 'year', {
  get: function() { return this.getFullYear(); },
  set: function(y) { this.setFullYear(y); }
});
  
var now = new Date();
alert(now);
alert(now.year); 

var o = { a: 0 };

Object.defineProperties(o, {
    'b': { get: function() { return this.a + 1; } },
    'c': { set: function(x) { this.a = x / 2; } }
});

 
o.c = 50;
alert(o.b);