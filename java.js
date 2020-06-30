const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('gameArea');

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

startScreen.addEventListener('click',start);

let keys = {ArrowUp:false , ArrowDown:false , ArrowLeft:false , ArrowRight:false}
let player = { speed: 5,score:0};

function keyDown(key){

    key.preventDefault();
    // console.log(key.key);
    keys[key.key] = true;
    // console.log(keys);
  
}

function keyUp(key){

    key.preventDefault();
    // console.log(key.key);
    keys[key.key] = false;
    // console.log(keys);
}

function collide(a, b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    // console.log(aRect);
    return !((aRect.bottom < bRect.top)
    || (aRect.top > bRect.bottom)
    || (aRect.right < bRect.left)
    || (aRect.left > bRect.right));
}

function moveLInes(){
       
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(item){
        
        if(item.y > 700){
            item.y -= 750; 
        }
        item.y  += player.speed;
        item.style.top = item.y + "px";
        hidden.appendChild(item);
    })
    
}
function gamePlay(){

    // console.log('hey  i am clicked');
       let car = document.querySelector('.car');
       let road = hidden.getBoundingClientRect();
    // console.log(road.bottom);
   
    if(player.start){

        

        if(keys.ArrowUp && player.y > road.top + 60){player.y += -player.speed}
        if(keys.ArrowDown && player.y < road.height - 50 ){player.y += +player.speed}
        if(keys.ArrowLeft && player.x > road.left + 1 ){player.x += -player.speed}
        if(keys.ArrowRight && player.x  < (road.width + road.left - 50)){player.x += +player.speed}

        car.style.top = player.y +"px";
        car.style.left = player.x +"px";

        // console.log(road);
        // console.log(road.width + road.left );
        moveLInes();
        moveCars(car);
      
    window.requestAnimationFrame(gamePlay);
        // console.log(player.score++);

        player.score++;
        let ps = player.score -1;

        score.innerHTML = "score:" +ps;
}
}
function moveCars(car){
       
    let cars = document.querySelectorAll('.enemy');
    cars.forEach(function(item){
      
        if(collide(car,item)){
            player.start = false;
            let elements = document.querySelector('#remove');
            elements.classList.remove('hide');
            //  startScreen.classList.remove('hide');
            endGame();
        }
        if(item.y >= 700){
            item.y = -300;
            // console.log(item.y);
            // console.log('hello'); 
        item.style.left = Math.floor(Math.random()*300) + 'px';

        }
        item.y  += player.speed;
        item.style.top = item.y + "px";
        hidden.appendChild(item);
    })
    
}

 function lineLoop(){
    for(let x=0; x<5; x++){
        let lines = document.createElement('div');
        lines.setAttribute('class' , 'line');
        lines.y = x*150;
        lines.style.top = lines.y + "px";
        hidden.appendChild(lines);
        }
}
function endGame(){
    startScreen.classList.remove('hide');
    hidden.innerHTML = "";
    startScreen.innerHTML ="Game Over <br>"+ "Your final score is : " +player.score+"<br>"+"Click me to Play Again";
    score.innerHTML = "GAME OVER";
}

function start(){
    startScreen.classList.add('hide');
    lineLoop();
    
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);
    
    carCreate(); 
    enemyCar();
}

function enemyCar(){
    for(let x=0; x<3; x++){
        
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class' , 'enemy');
        
        enemyCar.y = ((x+1) *350 * -1);
        enemyCar.style.top = enemyCar.y + "px";

        let color = ['black', 'green' , 'yellow'];
        enemyCar.style.background = color[x];
        enemyCar.style.left = Math.floor(Math.random()*300) + 'px';
        
        hidden.appendChild(enemyCar);
        }

}

function carCreate(){
    let car = document.createElement('div');
    car.setAttribute('class','car');
   
    hidden.appendChild(car);
    player.x= 0;
    player.y = 0;
    player.y = car.offsetTop;
    player.x = car.offsetLeft;

    // console.log(car.offsetTop);
    // console.log(car.offsetLeft);
}
