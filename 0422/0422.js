/* 
    callstack - 중괄호 닫을때 stack에서 나간다
    비동기 처리
        - 결과가 언제 나올지 모르는 상황에서 다음것을 처리하고 싶을 때 쓴다
        Promise

    동기 처리
*/

// let a = 0;
// a();

// @@@@@@@@@ async await @@@@@@@@@@@@@@@

async function asyncTimeoutCheckAdult(age, timeout) {
    if (age >= 20) {
        setTimeout(()=> {
            console.log(`asyncTimeoutCheckAdult ${age}`)
            return age;
        }, timeout)
    }
    else throw new Error(age);
}

// await : async 함수가 종료될 때까지 기다린다 / async 안에서만 사용 가능
async function testAsyncAwaitFunc(){
    await asyncTimeoutCheckAdult(30, 1000);
    // resolve가 먼저 다 되고 reject 수행

    const promiseCheckAdult = asyncCheckAdult(10);
    promiseCheckAdult
    .then((data) =>  // resolve에서 보낸 것이 data로 넘어온다
    {
        console.log(`Age is ${data}`)
        console.log("true")
        return true;
    })
    .catch((data) => 
    {
        console.log(`Age is ${data}`)
        console.log("false")
        return false;
    })

    const promiseCheckAdult1 = asyncCheckAdult(21);
    promiseCheckAdult1
    .then((data) =>  // resolve에서 보낸 것이 data로 넘어온다
    {
        console.log(`Age is ${data}`)
        console.log("true")
        return true;
    })
    .catch((data) => 
    {
        console.log(`Age is ${data}`)
        console.log("false")
        return false;
    })
}


function asyncCheckAdult(age) {
    return new Promise((resolve, reject) => {
        if (age >= 20) resolve(age);
        else reject(age);
    })
}

// const obj = new Class 객체가 만들어진다
// new는 runtime중에 메모리를 할당해주기 때문에 더 늦게 된다 (동적 할당)
// testFunc1()은 compile중에 메모리에 할당


// new Promise 호출과 동시에 비동기 처리 시작
const promise = new Promise((resolve, reject) => { // resolve, reject도 함수이다
    /*
        시간이 오래 걸리는 실행문 ... 5초
    */
    resolve();
    reject();

});

promise
.then(() => {
        console.log('1. promise() then() called');
})
.catch(() => {
    console.log('2. promise() catch() called');

});

function testFunc1() { 
    console.log("testFunc1()")

    let startTime = new Date().getTime();
    while(new Date().getTime() - startTime < 1000); // while이 모두 끝나고 밑으로 넘어감

    testFunc2();
}

function testFunc2() {
    console.log("testFunc2()")
}


testFunc1();
testAsyncAwaitFunc()