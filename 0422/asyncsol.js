/*
    비동기 처리
    Promise

    동기 처리
*/

// let a = 0;
// a();



// async await

function setTimeoutPromise(timeout) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
           resolve(); 
        }, timeout);
    })
}
async function timeoutCheckAdult(age, timeout) {
    
    console.log(`${age}. timeoutCheckAdult`);
    await setTimeoutPromise(timeout);
    console.log(`${age}. timeoutCheckAdult`);

    if (age > 20) return true;
    return false;
}

async function testAsyncAwaitFunc()
{
    timeoutCheckAdult(10, 3000);
    timeoutCheckAdult(20, 2000);
    timeoutCheckAdult(30, 1000);

    // await timeoutCheckAdult(10, 3000);
    // await timeoutCheckAdult(20, 2000);
    // await timeoutCheckAdult(30, 1000);


    // let promises = [];

    // promises.push(timeoutCheckAdult(10, 8000));
    // promises.push(timeoutCheckAdult(20, 5000));
    // promises.push(timeoutCheckAdult(30, 1000));

    // let results = await Promise.all(promises);
    // console.log(results);


}

testAsyncAwaitFunc();

