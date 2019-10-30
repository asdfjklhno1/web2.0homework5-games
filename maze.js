window.onload = function () {
    /* var paths = document.getElementsByClassName("path");
    var start = document.getElementById("start");
    var end = document.getElementById("end"); */
    /* for(var i=0 ; i<5 ; i++){
        paths[i].addEventListener('mouseover', this.onPath);
        paths[i].addEventListener('mouseout', this.outPath);
    }
    start.addEventListener('mouseover', this.gameStart);
    start.addEventListener('mouseout', this.outPath);
    end.addEventListener('mouseover', this.gameOver); */
    var gameArea = document.getElementsByClassName("gameArea")[0];

    gameArea.addEventListener('mouseleave', this.outMaze);
    gameArea.addEventListener('mousemove', this.outXY);
    gameArea.addEventListener('mousemove', this.ifInPath);
}

var x = 0;
var y = 0;
var isStart = false;
var isEnd = false;
var ifFromInside = false;

function result(num) {
    var text = document.getElementById('display');
    switch (num) {
        case 1:
            text.className = 'display';
            text.value = 'You Win!'
            break;
        case 2:
            text.className = 'display';
            text.value = 'You Lose!'
            break;
        case 3:
            text.className = 'display3';
            text.value = 'Don\'t cheat, you should start form the \'S\' and move to the \'E\' inside the maze!'
            break;
        case 4:
            text.className = 'display';
            text.value = '';
            break;
        case 5:
            text.className = 'display';
            text.value = 'Start!';
            break;
    }

}

function gameStart() {
    isStart = true;
    ifFromInside = false;
    isEnd = false;
    readyToStart();
    result(5);
    /* console.log('gamestart'); */
}

function outMaze() {
    var gameArea = document.getElementsByClassName("gameArea")[0];
    var className = gameArea.className;
    if (className.indexOf('wrong') > 0) {
        gameArea.className = 'gameArea';
    }
    /* console.log('outmaze'); */
}

function outXY(event) {
    x = event.offsetX;
    y = event.offsetY;
    /* console.log(x, y); */
}

function readyToStart() {
    var text = document.getElementById('display');
    var gameArea = document.getElementsByClassName("gameArea")[0];
    var className = gameArea.className;
    if (className.indexOf('wrong') > 0) {
        gameArea.className = 'gameArea';
    }
    text.className = 'display';
}

function Loss() {
    if (!isStart) return;
    if (isEnd) return;
    isEnd = true;
    var gameArea = document.getElementsByClassName("gameArea")[0];
    var className = gameArea.className;
    if (className.indexOf('wrong') < 0) {
        gameArea.className += ' wrong';
    }
    /* console.log('loss'); */
    result(2);
}

function gameOver() {
    if (isEnd) return;
    isEnd = true;
    if (isStart) {
        if (ifFromInside) {
            /* win */
            /* console.log('win'); */
            result(1);
        }
        else {
            /* cheat */
            /* console.log('cheat'); */
            result(3);
        }
    }
    else {
        /* cheat  */
        /* console.log('cheat'); */
        result(3);
    }
    /* console.log('gameover'); */
}


function ifInPath() {
    if (x >= 0 && x < 150) {
        if (x >= 0 && x < 30) {
            if (y > 170 && y < 200) {
                gameStart();
            }
        }
        else if (y > 170 && y < 200) {

        }
        else {
            Loss();
        }
    }
    else if (x >= 150 && x < 180) {
        if (y > 70 && y < 200) {

        }
        else {
            Loss();
        }
    }
    else if (x >= 180 && x < 320) {
        if (y > 70 && y < 100) {

        }
        else {
            Loss();
        }
    }
    else if (x >= 320 && x < 350) {
        if (y > 70 && y < 200) {

        }
        else {
            Loss();
        }
    }
    else if (x >= 350 && x < 500) {
        if (x >= 460 && x < 470) {
            if (y > 170 && y < 200) {
                ifFromInside = true;
            }
        }
        else if (x >= 470 && x < 500) {
            if (y > 170 && y < 200) {
                gameOver();
            }
        }
        else if (y > 170 && y < 200) {

        }
        else {
            Loss();
        }
    }
}