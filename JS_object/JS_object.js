'use strict';
// computed properties
let fruit = prompt("Which fruit do you want ?", "apple");
let bag = {
  [fruit]: 5,
};
alert(bag.apple);

// reserved words are allowed as object properties except __proto__
let obj = { };
obj.__proto__ = 7;
alert(obj.__proto__)

// Property value shorthand
function makeUser(name, age)
{
	return {
	  name: name,
	  age: age,
	};
}

let user = makeUser("John", 23);
alert(user.name);
alert(user.age);

function setData(name)
{
	return {
	  name, // same as name: name
	  age: 17,
	};
}

let data = setData("Gaurav")
alert(data.name);
alert(data.age);

// Existence Check
user = { };
alert(user.noSuchProperty === undefined);
// in operator
user = { name: "John", age: 20 };
alert("name" in user);

obj = {
  test: undefined
};

alert(obj.test == undefined);
alert( "test" in obj);

alert(String(Math.trunc(Number("50"))));
alert(String(Math.trunc(Number("+50"))));
alert(String(Math.trunc(Number("1.2"))));

// properties are oredered in a special manner: integer properies are sorted, other properties appear in order of creation
let codes = {
   "49": "Germany",
   "41": "Switzerland",
   "44": "UK",
   "1": "US"
 };
 
for(let key in codes) {
  alert(key);
}

// so how we can integer properties orderd in creation manner: make them non-integer by using + symbol
codes = {
   "+49": "Germany",
   "+41": "Switzerland",
   "+44": "UK",
   "+1": "US",
   2: null,
 };
 
for(let key in codes) {
  alert(key);
}

// copying by reference
user = { name : "John"};
let admin = user;
admin.name = "Pete";
alert(user.name);

// comparison by reference
// == operator & operator === works same for object
let a= { };
let b = a;
alert(a==b);
alert(a===b);

let c = { };
alert(a == c);

// const object : an object declared as const can be changed

const o = { name: "John"};
o.name = "ram";
o.age = 20;
alert(o.name);
alert(o.age);

// cloning an object
user = {
  name: "Sita",
  age: 24,
};
let clone = { };
for(let key in user) {
  clone[key] = user[key];
  
}

for( let key in clone) {
  alert(key);
  alert(clone[key]);
}

// Another method: Object.assign, it can copy properties from many source objects

user = {name: "Python" };
let permission1 = {canEdit: true};
let permission2 = {canView: true};
Object.assign(user, permission1, permission2);

for(let key in user) {
  alert(key);
}

// if the receiving object has same property, it will be overwritten

// using Object.assign for simple cloning
user = {name: "John" };
 clone = Object.assign({ }, user);