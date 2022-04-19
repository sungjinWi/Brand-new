// function a(callback) {
//     console.log("a go");
//     callback();
// }
// function b(callback) {
//     console.log("b go");
//     callback();
// }
// function c() {console.log("c go");}

// a();
// b();
// c();

// setTimeout(a,1000); // 비동기
// setTimeout(b,2000); // 비동기
// setTimeout(c,3000); // 비동기
// 총 걸린 시간 3초

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// a 1초 뒤에 b b 2초 뒤에 c 이런식으로 호출하고 싶으면???

// 1. callback
// 2. promise
// 3. async await


// 1. callback

// function a(callback) {
//     setTimeout(()=>{
//         console.log("a go");
//         callback();
//     }, 1000)
// }
// function b(callback) {
//     setTimeout(()=>{
//         console.log("b go");
//         callback();
//     }, 2000)
    
// }
// function c() {
//     setTimeout(()=>{
//     console.log("c go");
//     }, 3000)
// }



// function letterRace() {
//     a(() => {
//         b(()=> {
//             c();
//         })
//     })
// }

// letterRace();

//////////////////////////////////////////////////////////////////////////

// 2. promise 객체

function a() {
    return new Promise((resolve,reject) => { 
        // new Promise는 Promise안에서 객체를 만드는 것이다
        // Promise는 background
        setTimeout(()=>{
            resolve("a go") // a go가 then의 data 변수로 옮겨진다
        }, 1000)
    })
}

a().then(data=> console.log(data))