/* 
    오늘 할일
        배열 Array
*/

let testArray = [1, 2, 3, 4, 5]; //다양한 데이터 타입을 넣을 수 있다
// let testArray = [1, "text", 3, [1, 2], {"token" : true}]; //다양한 데이터 타입을 넣을 수 있다
let testArray2 = new Array(5);

testArray[0] = 100;

// 1 => i 조작할 때 사용
for(let i = 0; i < testArray.length; i++)
{
    testArray[i];
}

// 2
testArray.forEach((number, index, arr) => {
    console.log("1. value : ", number, "index : ", index, 'array : ', arr)
})

// 3 => 새로운 배열반환
let arrayMultiple = testArray.map(x => x * 2);
console.log(arrayMultiple)

testArray.push(30);
// testArray.forEach((number, index, arr) => {
//     console.log("2. value : ", number, "index : ", index, 'array : ', arr)
// })
console.log(testArray)

testArray.pop();
// testArray.forEach((number, index, arr) => {
//     console.log("3. value : ", number, "index : ", index, 'array : ', arr)
// })
console.log(testArray)



// unshift와 shift는 앞에 추가하거나 제거해서 새로 다 복사해야되기 때문에 더 느리다
// 앞쪽에 추가할 일이 있으면 array말고 다른 데이터 handle을 고려해보자

testArray.unshift(300);
console.log(testArray)

testArray.shift();
console.log(testArray)



console.log("======================================================================")

const canvas = document.getElementById("myCanvas");

const context = canvas.getContext("2d"); 

// 볼 관련
const arcRadius = 20;
let arcPosX = canvas.width / 2 + 20;
let arcPosY = canvas.height / 2;
let arcMvDirX = 1;
let arcMvDirY = 1;
let arcMvSpd = 4;

let ball = {
    left : 0, right : 0, top : 0, bottom : 0
};

// 벽돌 관련
const brickWidth = 50; // 간격 10
const brickHeight = 25; // 간격 5
const brickColumn = 5;
const brickRow = 4;
let bricks = [];

// brick을 이런 구조로 만들겠다
/*
let brick = {
    left : 0, right : 0, top : 0, bottom : 0,
    col : 0 , row : 0
};
*/

// 패들 관련
const barWidth = 100;
const barHeight = 20;
let barPosX = canvas.width / 2 - barWidth / 2;
let barPosY = canvas.height - barHeight;
let barMvSpd = 10;

let paddle = {
    left : 0, right : 0, top : 0, bottom : 0
};

// 키처리 함수 추가
document.addEventListener("keydown", keyDownEventHandler);
document.addEventListener("keyup", keyUpEventHandler);

function keyDownEventHandler(e) 
{
    if(e.key == "ArrowRight" && barPosX < canvas.width - barWidth)
    {
        // 바를 오른쪽으로 이동
        barPosX+= barMvSpd;
    }
    else if(e.key == "ArrowLeft" && barPosX > 0)
    {
        // 바를 왼쪽으로 이동
        barPosX -= barMvSpd;
    }

    paddle.left = barPosX;
    paddle.right = barPosX + barWidth;
    paddle.top = barPosY;
    paddle.bottom = barPosY + barHeight;
}

function keyUpEventHandler()
{

}

function update() 
{
    // 데이터 수정 (ex) 도형의 위치 이동

    // arc X축

    if(arcPosX < arcRadius) {
        arcMvDirX = 1;
    }
    else if(arcPosX > canvas.width - arcRadius) {
        arcMvDirX = -1;
    }

    // arc Y축

    if(arcPosY -arcRadius < 0) 
    {
        arcMvDirY = 1;
    }
    else if(arcPosY + arcRadius > canvas.height) 
    {
        arcMvDirY = -1;
    }

    arcPosX += arcMvDirX * arcMvSpd;
    arcPosY += arcMvDirY * arcMvSpd;

    ball.left = arcPosX - arcRadius;
    ball.right = arcPosX + arcRadius;
    ball.top = arcPosY - arcRadius;
    ball.bottom = arcPosY + arcRadius;


    // 충돌 확인
    if(isCollisionRectToRect(ball, paddle))
    {
        arcMvDirY = -1;
    }
    
    bricks.map((colBricks) => {
        colBricks.map((brick) =>{
            
            if(isCollisionRectToRect(ball, brick) && bricks[brick.col][brick.row].display) { //없어지고나면 충돌확인 x
                bricks[brick.col][brick.row].display = false
                arcMvDirY = -arcMvDirY;
            }
        })
    })
}

function isCollisionRectToRect(rectA,rectB)
{
    //a의 왼쪽과 b의 오른쪽
    //a의 오쪽과 b의 왼쪽
    //a의 아래쪽과 b의 위쪽
    //a의 위쪽과 b의 아래쪽
    if (rectA.left > rectB.right ||
        rectA.right < rectB.left ||
        rectA.top > rectB.bottom ||
        rectA.bottom < rectB.top)
        {
            return false;
        }
    return true;

}

function draw() 
{
    // 화면 클리어
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvas()

    // 다른 도형 그리기 
    drawRect();
    drawArc();
    drawBricks();
}

function drawCanvas() 
{
    context.beginPath();

    context.rect(0, 0, 400, 400); 
    context.fillStyle = "lightgray";
    context.fill();
    
    
    context.closePath();
}

function drawRect() 
{
    context.beginPath();

    context.rect(barPosX , barPosY, barWidth, barHeight);
    context.fillStyle = "red";
    context.fill();
    
    
    context.closePath();
}

function drawArc() 
{
    context.beginPath();

    context.arc(arcPosX, arcPosY, arcRadius, 0 , 2 * Math.PI,);
    context.fillStyle = "blue";
    context.fill();


    context.closePath();
}


function setBricks() {
    for(let i = 0; i < brickRow; i++)
    {
        bricks[i] = [];
        for(let j =0; j < brickColumn; j++)
        {
            // TODO >> right : left + 50 해보기 => left undefined로 뜨며 error
            bricks[i][j] = {
                left : 55 + j * (brickWidth + 10),
                right : 55 + j * (brickWidth + 10) + brickWidth, 
                top : 30 + i  * (brickHeight + 5), 
                bottom : 30 + i * (brickHeight + 5) + brickHeight,
                col : i , row : j,
                display : true
            };
        }
    }
}

function drawBricks() 
{
    context.beginPath();
    for(let i = 0; i < brickRow; i++)
    {
        for(let j =0; j < brickColumn; j++)
        {
            if(bricks[i][j].display){
                context.rect(bricks[i][j].left, bricks[i][j].top, brickWidth, brickHeight); 
                context.fillStyle = "green";
                context.fill();
            }
            
        }
    }
    context.closePath();
}

setBricks();
setInterval(update, 10);
setInterval(draw, 10);