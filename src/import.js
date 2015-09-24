var sum = (a, b = 6)=>(a + b);

var square = (b)=> {
    "use strict";
    return b * b;
};

var variable = 9;


class MyClass{
    constructor(credentials){
        this.name = credentials.name;
        this.enrollmentNo = credentials.enrollmentNo
    }
    getName(){
        return this.name;
    }
}

export {sum,square,variable, MyClass};
