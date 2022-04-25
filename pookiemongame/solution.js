/*
V2에서 할것
1. 가위바위보 게임 만들기 
2. 이동상태와 전투상태 구분할것 (키보드 이동)
3. 몬스터 만날 확률
*/

class Tile {
    constructor(left, top, right, bottom, color) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.color = color;
    }

    draw(){
            context.rect(this.left, this.top, tileWidth, tileHeight); 
            context.fillStyle = this.color;
            
            context.fill();
    }
 
}

let canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

let rsp = document.getElementById("rspGame")

// 가위바위보 관련
let userRsp = "";
let buttons = [];
buttons = [...(document.getElementsByClassName("rspGame"))] 
// getElementsByClassName은 array가 아니다 => Array.from 또는 ...으로 배열로 바꾸기 가능

// player 관련
const arcRadius = 15;
let arcPosX = 20;
let arcPosY = 20;
let arcMvDirX = 1;
let arcMvDirY = -1;
let arcMvSpd = 40;

let player = {
    left : 0, right : 0, top : 0, bottom : 0
};

// 맵 관련
const tileWidth = 39; 
const tileHeight = 39; 
const tileColumn = 10;
const tileRow = 10;
let tiles; // 벽돌 전체

// game start여부
let startBool = false;

// 키처리 함수 추가
document.addEventListener("keydown", startKey);
document.addEventListener("keydown", keyDownEventHandler);
document.addEventListener("keyup", keyUpEventHandler);

// 가위바위보 버튼 누를 시
buttons.forEach((button)=> button.addEventListener("click",()=>{ // onclick 아니라 click
    userRsp = button.value;
    
    console.log(userRsp);
}))

function startKey(e)
{
    // 게임 시작 상태 아니면 시작
    if(e.key === " " && !startBool){
        startBool = true;
        setInterval(update, 10);
    }
}

function keyDownEventHandler(e) 
{   
   if(startBool)
   {

        if(e.key === "ArrowRight" && arcPosX < canvas.width - arcRadius - tileWidth)
        {
            // 플레이어를 오른쪽으로 이동
            arcPosX+= arcMvSpd;
        }
        else if(e.key === "ArrowLeft" && arcPosX - arcRadius - tileWidth > 0)
        {
            // 플레이어를 왼쪽으로 이동
            arcPosX -= arcMvSpd;
        }
        else if(e.key === "ArrowUp" && arcPosY - arcRadius - tileHeight > 0)
        {
            arcPosY -= arcMvSpd;
        }
        else if(e.key === "ArrowDown" && arcPosY < canvas.width - arcRadius - tileHeight)
        {
            arcPosY += arcMvSpd;
        }
   }
}

function keyUpEventHandler()
{

}

function update() 
{
    // 데이터 수정 (ex) 플레이어의 위치 이동

    // 게임 클리어 확인
    checkToWin();

    player.left = arcPosX - arcRadius;
    player.right = arcPosX + arcRadius;
    player.top = arcPosY - arcRadius;
    player.bottom = arcPosY + arcRadius;

    // 충돌 확인

}

function checkToWin()
    {
        if(isCollisionRectToRect(player, exit)){
            location.reload();
            alert("clear")
        }
        console.log(isCollisionRectToRect(player, exit))
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

    drawTiles();
    drawArc();
    drawExit();
}

function drawCanvas() 
{
    context.beginPath();

    context.rect(0, 0, 400, 400); 
    context.fillStyle = "lightgray";
    context.fill();
    
    
    context.closePath();
}

function drawTiles() 
{
    context.beginPath();
    for(let i = 0; i < tileRow; i++)
    {
        for(let j =0; j < tileColumn; j++)
        {
            tiles[i][j].draw()
        }
    }
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

function drawExit()
{
    context.beginPath();

    exit.draw();

    context.closePath();
}

function setTiles() 
{
    tiles = [];
    for(let i = 0; i < tileRow; i++)
    {
        tiles[i] = [];
        for(let j =0; j < tileColumn; j++)
        {

            tiles[i][j] = new Tile( j * (tileWidth + 1),
            i  * (tileHeight + 1),
            j * (tileWidth + 1) + tileWidth,
            i * (tileHeight + 1) + tileHeight,
            "green"
            )
        }
    }
}

function setExit()
{
    exit = new Tile( 9 * (tileWidth + 1),
    9  * (tileHeight + 1),
    9 * (tileWidth + 1) + tileWidth,
    9 * (tileHeight + 1) + tileHeight,
    "black"
    )
}


setTiles();
setExit();
setInterval(draw, 10);
