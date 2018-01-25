// Object Declaration - Literal Notation
var apple = {
  color : "green" ,
  cost : 3  
}
alert ( apple. color )

// Properties can be functions
var apple = {
  color : "green" ,
  cost : 3 ,  
  getColor : function ( ) { 
  return apple. color ; 
 } 
}
alert ( apple .getColor ( ) ) ;

// Example of Class

/ ** 
 * Module LifeexampleClass. 
 * / 
var LifeexampleClass = ( function ( ) { 
  
  var privateField1 = "value of private field1" ;  
  var privateField2 = "value of private field2" ;  
  
 // Function accessible only within the class. 
 function privateFunction ( ) { 
    alert ( " : [privateFunction] " ) ; 
    alert ( " The private method has accessed the private field: [privateField1 = '" +privateField1 + "']" ) ; 
    alert ( "The private method has accessed the public field: [publicField1 = '" + this . publicField1 + "']" ) ; 
    return true ; 
  } 
  
  return { 

    // Public fields of the class. 
    publicField1 : "public     field value1 " ,
publicField2 : "Public field value2" , 
    
    // Public class method.  
    init : function ( ) { 
      alert ('The public method of the class is called: [init]' ) ; 
      
      // Appeal to the public field, available both inside the class and from outside. 
      alert ( '[init] method turned to the public field [privateField1 =' + privateField1 + ']' ) ;    
      
      // Call the private function available only within the class. 
      privateFunction ( ) ; 
    } 
    
  } 
} ) ( ) ; 
// access to the private field, available only within the class. 
alert ( "An attempt was made to access the private field outside the class [privateField1] result =" +LifeexampleClass. privateField1 ) ; 


try {    
  // accessing a private method that is available only within the class, the next line will cause a
  LifeexampleClass error . privateFunction ( ) 
  alert ( "I could access the private class method! [Error in the class architecture]" ) ; 
} catch ( err ) { 
  alert ( "An error occurred + + err + " Access to the private class method is forbidden! " ) ; 
} 

// access to the public field, available both inside the class and from outside.
alert ( "Outside the class, an attempt was made to access the public field [publicField1] result =" + LifeexampleClass. publicField1 ) ; 


try {    
  // access to a public method available both inside the class and from outside. 
  LifeexampleClass. init ( ) 
} catch ( err ) { 
  alert ( "Could not access the public class method! [Error in class architecture]" ) ; 
}
