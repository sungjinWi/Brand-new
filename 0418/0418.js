// alert("start javascript");

// 숫자형

/*
    10진수
    255
    
    2진수 (0b 1111 1111) ,

              128 64 32 16    8 4 2 1

        179 (0b 1011 0011)

    8진수 (0o 3 7 7)

    16진수 (0x 15 15) -> (0xff)

*/

let num = 255;
console.log(num.toString(2));
console.log(num.toString(8));
console.log(num.toString(16));

Math.random(); // 0.0 ~ 1.0 사이의 랜덤한 값(난수)
let randomNum = Math.random() * 10; //랜덤한 정수를 얻기위해 * 10
console.log(randomNum);

console.log(Math.floor(randomNum)); // 내림
console.log(Math.ceil(randomNum)); //올림
console.log(Math.round(randomNum))  //반올림

/*
    실습.
    프로그램이 3~10 사이의 랜덤한 값을 지정한다.
    값을 하나 입력 받아서 정답인지 아닌지 출력해준다
    prompt 와 confirm 활용할 것
    prompt("정답을 입력하세요", 10); -> return input
    confirm(==) -> return true or false;    
*/

    if(true)
    {
        let randomNum = Math.round(Math.random() * 10);
        let correctNum = (randomNum % 8) + 3;
        let inputNum = prompt("정답을 입력하세요",0);
        if(res == input) alert("정답입니다");
        else alert (`정답은 ${res}입니다`)
    }

    
    


//변수명 이름 규칙
/*
    1. 알파벳, _, -, 숫자
        1_1. 숫자가 제일 앞에 올 수 없다
    2. camel 표기법
        let myVeryLongName;
    3. 대소문자를 구분한다
        let aBc;
        let abC;
*/

console.log(varName); // hoisting : js파일이 있으면 compile 할 때 변수들이 있으면 변수들을 가지고 memory를 잡아놓고 runtime에서 사용하기 때문에 밑에 선언해도 위에서 콘솔로그 : undefined
// 값을 넣어주는것은 초기화: runtime중에 해주는것이기 때문에 밑에서 값을 줘도 undefined로 나온다
var varName = "위성진";
console.log(varName);

if (true) 
{
    // 다른 영역

    var varName = "wisungjin"; // 전역변수는 해당 scope뿐만 아니라 project 전체에서 쓴다
    // local variable은 scope가 해제되면 같이 해제되기 때문에 memory 측면에서도 좋다
}

console.log(varName);



let letName = "wsj"; // 같은 scope안에서 중복선언 불가능
console.log(letName); //wsj
if (true)
{
    let letName = "sungjin2"; // 이 scope 안에서만 사용된다
    console.log(letName); // sungjin2

}
console.log(letName); // wsj


const constName = "sungjin"; //값이 수정 될 일이 없는 변수 (재할당 불가)
// 선언하면서 동시에 초기화가 필요하다
// document를 변수로 선언할 때
// constName = "wsj"; // 빨간줄이 뜨지 않으면 compile 에러 | compile: 사람의 언어에서 컴퓨터가 실행할 수 있는 언어로 변경
//debug console에 에러가 뜨는것은 runtime 에러