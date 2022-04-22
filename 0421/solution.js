/*
    클래스 (class)

    함수 생성자
*/


// let brick = {
//     left:0, right:0, top:0,, bottom:0,
//     column:0, row:0,
// }

// brick left, top, right, bottom, col, row, pos + 움직이는 기능

// 기능이 있는 형태로 만들 수 있게 되었다
// function Brick(left, top, right, bottom) { // constructor는 대문자로 시작
//     this.left = left,
//     this.top = top,
//     this.right = right,
//     this.bottom = bottom
// }

// let tempBrick = new Brick(0, 0, 10, 10);
// tempBrick.movingAction();

// 이렇게 하면 function이 20개 생긴다
// for(let i =0; i < 20; i++)
// {
//     let tempBrick = new Brick(0, 0, 10, 10);
//     tempBrick.movingAction();
// }

// prototype 구조를 잡는 단계에서만 사용되는 것
// Brick.prototype.movingAction = () => this.left++; console.log("moving");


// ES6 에서는 class로
class Brick {
    constructor(left, top, right, bottom, color) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.color = color;
        this.isAlive = true;
    }

    draw(){
        if(this.isAlive) // bricks[i][j] 를 this로 바꾼다
            {
                context.rect(this.left, this.top, brickWidth, brickHeight); 
                context.fillStyle = this.color;
                
                context.fill();
            }
    }
    // movingAction () {
    //     this.left++;
    //     console.log("moving");
    // }
}

class MovingBrick extends Brick {
    movingAction() {
        mvBrickPos += mvBrickDir;
        this.left = mvBrickPos;
        this.right = mvBrickPos + brickWidth;
        if(mvBrickPos < 0) {
            mvBrickDir = 1;
        }
        else if(mvBrickPos > canvas.width - brickWidth) {
            mvBrickDir = -1;
        }

        if(isCollisionRectToRect(ball, this))
        {
            arcMvDirX = -arcMvDirX;
            arcMvDirY = -arcMvDirY;
        }
    }
}

let canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d"); 

// 게임 진행 관련
let deadBricksCount = 0;

// 패들 관련
const barWidth = 200;
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
let bricks; // 벽돌 전체


// brick을 이런 구조로 만들겠다
/*
let brick = {
    left : 0, right : 0, top : 0, bottom : 0,
    col : 0 , row : 0
};
*/

// 움직이는 벽돌 관련
let movingBrick;
let mvBrickPos = canvas.width / 2 - brickWidth/2;
let mvBrickDir = 1;



let paddle = {
    left : 0, right : 0, top : 0, bottom : 0
};

// game start여부
let startBool = false;











// gameover위해 죽은 개수 세기
let bricksCnt = brickColumn * brickRow;

// 키처리 함수 추가
document.addEventListener("keydown", keyDownEventHandler);





document.addEventListener("keyup", keyUpEventHandler);





function keyDownEventHandler(e) 
{   





    // 게임 시작 상태 아니면 시작
    if(e.key === " " && !
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    ol){
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

    // 게임 클리어 확인
    checkToWin();

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
                    // deadBricksCount++; // 카운트로 세서 할 때
                    break; // 한개만 부딪히면 break으로 나간다
                }
        }
    }
    
    
    

    // game over 확인
    // if(arcPosY == canvas.height - arcRadius) {
    //     window.location.reload()
    //     alert("game over");
    // }

    movingBrick.movingAction();
}

function checkToWin()
    {
        // 1. bricks 배열에 있는 정보로 처리


        let flatBricks = bricks.flat(); // 2차원배열을 1차원배열로 만든다

        let deadBricks = flatBricks.filter(brick => brick.isAlive == false);
        if(deadBricks.length == bricksCnt)
        {
            //게임 클리어
            location.reload();
            alert("game clear");
        }

        // 2. 카운트를 세는 변수를 만들어서 처리
        if (deadBricksCount == bricksCnt)
        {
            // 게임 클리어
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
    drawCanvas()

    // 다른 도형 그리기 
    drawRect();
    drawArc();
    drawBricks();
    drawMvBrick()
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


function setBricks() 
{
    bricks = [];
    for(let i = 0; i < brickRow; i++)
    {
        bricks[i] = [];
        for(let j =0; j < brickColumn; j++)
        {
            // bricks[i][j] = {
            //     left : 55 + j * (brickWidth + 10),
            //     right : 55 + j * (brickWidth + 10) + brickWidth, 
            //     top : 30 + i  * (brickHeight + 5), 
            //     bottom : 30 + i * (brickHeight + 5) + brickHeight,
            //     col : i , row : j,
            //     isAlive : true
            // };

            bricks[i][j] = new Brick(55 + j * (brickWidth + 10),
            30 + i  * (brickHeight + 5),
            55 + j * (brickWidth + 10) + brickWidth,
            30 + i * (brickHeight + 5) + brickHeight,
            "green"
            )
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
            bricks[i][j].draw()
        }
    }
    context.closePath();
}

function setMvBrick() {
    
    movingBrick = new MovingBrick(mvBrickPos, 200, mvBrickPos + brickWidth, 200 + brickHeight, "black");
}

function drawMvBrick()
{
    context.beginPath();
    movingBrick.draw();

    context.closePath();
}

setBricks();
setMvBrick();
setInterval(draw, 10);



