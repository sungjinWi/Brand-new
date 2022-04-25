// 내가 원래 짠 코드
function something() {
    monWeaponRate = Math.ceil(Math.random()*3);
    switch(monWeaponRate) {
        // case는 범위 설정 불가
        case 1 :
            monWeapon = "bawi";
            break;
        case 2 :
            monWeapon = "gawi";
            break;
        case 3 :
            monWeapon = "bo";
            break;
    }
    if(userWeapon == monWeapon) {
        alert("비겼으니 retry")
        return false;
    }
    switch (userWeapon) {
        case "gawi" : 
            if(monWeapon == "bo") {
                alert("win");
            }
            else {
                alert("lose");
            }
            break;
        case "bawi" :
            if(monWeapon == "gawi") {
                alert("win");
            }
            else {
                alert("lose");
            }
            break;
        case "bo" :
            if(monWeapon == "bawi") {
                alert("win");
            }
            else {
                alert("lose");
            }
    }
}


//  교수님이 말해주니 훨씬 간결하누
/* 
가위 0 바위 1 보 2로 했을때
승패에 따라 내가 낸거 - 적이 낸거 해보면
승 : 1 1 -2
패 : -1 -1 2
전체 +3 해보면

 441
 225

 나온수 % 3 하면 승과 패의 경우 같은 것을 알 수 있다
 */



