//Activity 1
var myObject = {};

myObject.name = "banana";
myObject.pi = 3.14;
myObject.otherStuff = {
  colour: "yellow",
  length: "25"
};

console.log(myObject);

myObject.name = "generic yellow fruit";
console.log(myObject);

delete myObject.pi;
console.log(myObject);


//Activity 2
var Person = (function(){
  function Person(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
  }
  Person.prototype = Object.create(Object.prototype, {
    firstName: {
      writable: true,
      value: ""
    },
    lastName: {
      writable: true,
      value: ""
    },
    fullName: {
      get: function(){
        return this.firstName + " " + this.lastName;
      }
    }
  });
  return Person;
}());

var myPerson = new Person("Peter", "Parker");
console.log(myPerson.fullName);
