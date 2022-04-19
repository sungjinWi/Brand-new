/* 
    오늘 할일
        -캔버스 설정
        -document
        -context
*/

const canvas = document.getElementById("myCanvas");

const context = canvas.getContext("2d"); // 그려주는 것에 대한 제어권

const arcRadius = 20;


let arcPosX = canvas.width / 2 + 20;
let arcPosY = canvas.height / 2;
let arcMvDirX = 1;
let arcMvDirY = 1;
let arcMvSpd = 1;

let ball = {
    left : 0, right : 0, top : 0, bottom : 0
};

const barWidth = 100;
const barHeight = 20;
let barPosX = canvas.width / 2 - barWidth / 2;
let barPosY = canvas.height - barHeight;
let barMvSpd = 10;

let paddle = {
    left : 0, right : 0, top : 0, bottom : 0
};


document.addEventListener("keydown", keyDownEventHandler);
document.addEventListener("keyup", keyUpEventHandler);

function keyDownEventHandler(e) 
{
    if(e.key == "ArrowRight" && barPosX < canvas.width - barWidth)
    {
        // 바를 오른쪽으로 이동
        barPosX+= barMvSpd;
    }
    else if(e.key == "ArrowLeft" && barPosX > 0) // if에서 일어나면 else if는 고려 x
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

    if(barPosX<arcPosX<barPosX+100)

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

    // 다른 도형 그리기 
    drawCanvas()
    drawRect();
    drawArc();
}

function drawCanvas() 
{
    context.beginPath();

    context.rect(0, 0, 400, 400); // 시작점이 좌상단 모서리
    context.fillStyle = "lightgray";
    context.fill();
    
    
    context.closePath();
}

function drawRect() 
{
    context.beginPath();

    context.rect(barPosX , barPosY, barWidth, barHeight); // 시작점이 좌상단 모서리
    context.fillStyle = "red";
    context.fill();
    
    
    context.closePath();
}

function drawArc() 
{
    context.beginPath();

    context.arc(arcPosX, arcPosY, arcRadius, 0 , 2 * Math.PI,); // arc는 시작점으로 정해준곳이 중점이다
    context.fillStyle = "blue";
    context.fill();


    context.closePath();
}


setInterval(update, 10);
setInterval(draw, 10);