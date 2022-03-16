// //module wrapping function
// (function (exports, require, module, __filename, __dirname){

// })

console.log(__filename, __dirname);

class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    greeting(){
        console.log(`my name is ${this.name} and my age is ${this.age}`);
    }
}
module.exports = Person;