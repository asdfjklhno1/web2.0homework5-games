window.onload = function () {
    for(var i=0 ; i<60 ; i++){
        var mole = document.getElementsByClassName('mole')[i];
        mole.addEventListener('mousedown', hit.bind(this, i)); //bind在传入传参函数时不执行
        mole.addEventListener('click', reset.bind(this, i));
    }
    var startOrPause = document.getElementById('start');
    var end = document.getElementById('end');
    startOrPause.addEventListener('click', this.gameStartOrPause);
    end.addEventListener('click', this.gameEnd);
    this.disabledMoles();
}

var displayTime = 0;
var displayScore = 0;
var isStart = false;
var isPause = false;
var flag;

function reset(num) {
    var mole = document.getElementsByClassName('mole')[num];
    mole.checked = false;
}

function hit(num) {
    var mole = document.getElementsByClassName('mole')[num];
    if(mole.checked == true){
        displayScore ++;
        display();
        mole.checked = false;
        randomMole(num);
        console.log('hit');
    }
    else{
        mole.checked = false;
        displayScore --;
        display();
        console.log('miss');
    }
}

function randomMole(num) {
    var moles = document.getElementsByClassName('mole');
    var randomNum = Math.floor(Math.random()*60);
    /* 防止重合 */
    if(randomNum == num)
        randomNum = (randomNum + Math.floor(Math.random()*60))%60 ;
    moles[randomNum].checked = true;
}

function display() {
    var score = document.getElementById('score');
    var time = document.getElementById('time');
    score.value = displayScore;
    time.value = displayTime;
}

function disabledMoles() {
    var moles = document.getElementsByClassName('mole');
    for(var i=0 ; i<60 ; i++){
        moles[i].disabled = true;
    }
}

function enabledMoles() {
    var moles = document.getElementsByClassName('mole');
    for(var i=0 ; i<60 ; i++){
        moles[i].disabled = false;
    }
}

function clearMoles() {
    var moles = document.getElementsByClassName('mole');
    for(var i=0 ; i<60 ; i++){
        moles[i].checked = false;
    }
}

function gameStartOrPause() {
    if(isStart){
        if(isPause){
            isPause = false;
            flag = window.setInterval("timeCountDown()", 1000);
            enabledMoles();
        }
        else{
            isPause = true;
            window.clearInterval(flag);
            disabledMoles();          
        }     
    }
    else{
        isStart = true;
        displayTime = 30;
        displayScore = 0;
        display();
        flag = window.setInterval("timeCountDown()", 1000);
        enabledMoles();
        randomMole(0);
    }   
}

function gameEnd() {
    window.clearInterval(flag);
    disabledMoles();
    clearMoles();
    isStart = false;
}

function timeCountDown() {
    displayTime -- ;
    display();
    if(displayTime <= 0){
        gameEnd();
    }
}