function myFunc(){
	return 'func';
}

async function myAsync(){
    return 'async';
}


// console.log(myFunc());
// console.log(myAsync()); // Promise{ "async" }

//async 함수의 return은 Promise가 된다


// myAsync().then((result) => {
// 	console.log(result); // async
// })

// promise.then((data)  => console.log(data))를 하면 promise가 return하는 것이 data가 된다


// ======================================= 위는 async를 promise 대신 사용법 ===============

// await은 어떻게 쓰이는가

/* 
await는 async 함수 안에서만 동작하며, 이름에서부터 알 수 있듯이 await은 무언가를 기다리는 것을 말한다.

그러면 뭘 기다리냐면?

프로미스가 resolve가 돼서 결괏값이 넘어올 때까지 기다리는 것을 말한다.
*/

var resolveAfter1Second = function() {
    console.log("starting fast promise");
    return new Promise(resolve => {
      setTimeout(function() {
        resolve(10);
        console.log("fast promise is done");
      }, 1000);
    });
};

async function f() {

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("완료!"), 1000)
    });
    
    let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)
    
    const ss = await resolveAfter1Second();
    console.log(1);
    console.log(result) // "완료!"
}


  
f();
