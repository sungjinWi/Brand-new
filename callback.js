// 선언과 호출의 차이를 확실히 구별할 줄 알아야한다

const sum = (a,b) => a+b;
const myFunc = (callback, a, b) => callback(a,b);

function sum(a,b) {
    return a+b;
}

function myFunc(callback, a, b) {
    return callback(a, b);
}

myFunc(sum, a, b)