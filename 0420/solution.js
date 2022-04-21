
let canvas = document.getElementById("myCanvas");

const context = canvas.getContext("2d"); 

// 패들 관련
const barWidth = 100;
const barHeight = 20;
let barPosX = canvas.width / 2 - barWidth / 2;
let barPosY = canvas.height - barHeight;
let barMvSpd = 10;

// 볼 관련
const arcRadius = 20;
let arcPosX = canvas.width / 2;
let arcPosY = canvas.height - barHeight - arcRadius;
let arcMvDirX = 1;
let arcMvDirY = -1;
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



let paddle = {
    left : 0, right : 0, top : 0, bottom : 0
};

// game start여부
let startBool = false;
// gameover위해 죽은 개수 세기
let bricksCnt = brickColumn * brickRow;
let deadCnt = 0;

// 키처리 함수 추가
document.addEventListener("keydown", keyDownEventHandler);
document.addEventListener("keyup", keyUpEventHandler);

function keyDownEventHandler(e) 
{   
    // 게임 시작 상태 아니면 시작
    if(e.key === " " && !startBool){
        startBool = true;
        setInterval(update, 10)
        arcMvDirX =[1,-1][Math.round(Math.random())]
    }
    else if(e.key === "ArrowRight" && barPosX < canvas.width - barWidth)
    {
        // 바를 오른쪽으로 이동
        barPosX+= barMvSpd;
    }
    else if(e.key === "ArrowLeft" && barPosX > 0)
    {
        // 바를 왼쪽으로 이동
        barPosX -= barMvSpd;
    }
    else if(e.key === "ArrowUp")
    {
        arcMvSpd++;
    }

    if(!startBool) {
        arcPosX = barPosX + barWidth /2;
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

    for(let i = 0; i < brickRow; i++)
    {
        for(let j=0; j < brickColumn; j++)
        {
            if(bricks[i][j].isAlive && isCollisionRectToRect(ball, bricks[i][j]))
                {
                    // 벽돌 안보이게, ball 방향 변경
                    bricks[i][j].isAlive = false;
                    arcMvDirY = -arcMvDirY;
                    deadCnt++;
                    break; // 한개만 부딪히면 break으로 나간다
                }
        }
    }
    
    // game clear 확인
    if(deadCnt === 20) {
        setTimeout(()=> {
            window.location.reload()
            alert("game clear");
        },20)
        
        
    }

    // game over 확인
    // if(arcPosY == canvas.height - arcRadius) {
    //     window.location.reload()
    //     alert("game over");
    // }
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
            bricks[i][j] = {
                left : 55 + j * (brickWidth + 10),
                right : 55 + j * (brickWidth + 10) + brickWidth, 
                top : 30 + i  * (brickHeight + 5), 
                bottom : 30 + i * (brickHeight + 5) + brickHeight,
                col : i , row : j,
                isAlive : true
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
            if(bricks[i][j].isAlive)
            {
                context.rect(bricks[i][j].left, bricks[i][j].top, brickWidth, brickHeight); 
                context.fillStyle = "green";
                context.fill();
            }
            
        }
    }
    context.closePath();
}

setBricks();
setInterval(draw, 10);



