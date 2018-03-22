//Activity 1
var myArray = [];

myArray.push(1);
myArray.push("banana");
myArray.push({meaningOfLife: 42});
console.log(myArray);

myArray[0] = 3.14;
console.log(myArray);

myArray.splice(2, 1);
console.log(myArray);

myArray.splice(1, 0, "orange");
console.log(myArray);

var loc = myArray.indexOf("orange");
console.log(loc);


//Activity 2
var myNumberArray = [2,40,17,4,23,87,14,21,36,29];

myNumberArray = myNumberArray.filter(function(item){
  return item >= 10 && item <=30;
})

myNumberArray.sort(function(a,b){
  return a-b;
})

console.log(myNumberArray);
