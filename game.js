
class snake{
	constructor(){
		this.length = 2;
		this.x = 15;
		this. y = 10;
		this.dir = 2;//0 1 2 3 위 오른쪽 아래 왼쪽 ㄱㄱ 왼쪽 오른쪽 방향키 클릭시 값 -1, + 1 하면 회전 ㅆㄱㄴ
		this.body = [[15, 10], [15,9]];
		
		window.timer = setInterval(()=>{this.move();}, 150);
	}
	
	move(){
		let tx = this.body[0][0];
		let ty = this.body[0][1];
		
		if(this.dir == 0){
			ty-=1;
		}
		else if(this.dir == 1){
			tx+=1;
		}
		else if(this.dir == 2){
			ty+=1;
		}
		else{
			tx-=1;
		}
		
		if(this.check(tx, ty)){
			this.body.unshift([tx, ty]);
			
			if(fruit.x == tx && fruit.y == ty){
				this.length++;
				fruit.replace();
			}
			else{
				this.body.pop();
			}
			
		}
		else{
			gameover();
		}
	}
	
	check(a, b){
		if(0 <= a && a <= blockN-3 && 0 <= b && b <= blockN-3){
			return true;
		}
		return false;
	}
}

class apple{
	constructor(){
		this.x = 3;
		this.y = 3;
	}
	
	replace(){
		this.x = rand(0, blockN - 3);
		this.y = rand(0, blockN - 3);
	}
}
////////////////////////////////////////
function init(){
	window.canvas = document.getElementById('screen');
	window.scr = canvas.getContext('2d');
	
	//window.addEventListener('resize', updateSize);
	window.addEventListener('keydown', (e) => {clicked(e);});
	
	updateSize();
	window.player = new snake();
	window.fruit = new apple();
	window.blockN = 30;
	window.blockL = window.canvas.width / blockN;
	
	
	return new Promise(function(resolve, reject){
		console.log("loading complete!")
		resolve();
	})
}		

function updateSize(){
	window.canvas.width = Math.min(document.body.clientWidth / 2, document.body.clientHeight);
	window.canvas.height = window.canvas.width;
}

function play(){
	init().then(loop);
}

function loop(){
	window.playing = setInterval(draw, 10);
}

function gameover(){
	clearInterval(timer);
	clearInterval(playing);
	scr.clearRect(0,0,canvas.width,canvas.height);
	scr.fillStyle = 'black';
	scr.font = '60px consolas';
	scr.fillText('GAME OVER!!', canvas.width/3, canvas.height/2);
}
/////////////////////////////////
function clicked(e){
	
	if(e.key == "ArrowUp" && player.dir != 0){
		player.dir = 0;
		player.move();
	}
	else if(e.key == "ArrowRight" && player.dir != 1){
		player.dir = 1;
		player.move();
	}
	else if(e.key == "ArrowDown" && player.dir != 2){
		player.dir = 2;
		player.move();
	}else if(e.key == "ArrowLeft" && player.dir != 3){
		player.dir = 3;
		player.move();
	}
	else{
		return;
	}
	
	
}

function rand(m, M){
	return Math.floor(Math.random() * (M - m)) + m;
}

////////////////////////////////////////////
function draw(){
	scr.clearRect(0,0,canvas.width,canvas.height);
//	drawBackground();
	drawField();
	drawSnake();
	drawApple();
}

function drawField(){
	scr.fillStyle = "purple";
	for(let i=0; i < blockN - 2; i++){
		for(let j=0; j<blockN - 2; j++){
			scr.fillRect(i*blockL + 1 * i, j*blockL + 1 * j, blockL, blockL);
		}
	}
	
}

function drawSnake(){
	g = 250/player.length;
	n = 0;
	for(let i=player.length - 2; i >= 0; i--){
		n += g;
		scr.fillStyle = `rgba(0, ${n}, 0, 1)`;
		scr.fillRect(player.body[i][0] * (blockL + 1), player.body[i][1] * (blockL + 1), blockL, blockL);
		scr.fillStyle = "black";
		scr.strokeRect(player.body[i][0] * (blockL + 1), player.body[i][1] * (blockL + 1), blockL, blockL);
	}
	scr.fillStyle = "black";
	scr.fillRect(player.body[player.length-1][0] * (blockL + 1), player.body[player.length-1][1] * (blockL + 1), blockL, blockL);
	scr.strokeRect(player.body[player.length-1][0] * (blockL + 1), player.body[player.length-1][1] * (blockL + 1), blockL, blockL);
}

function drawBackground(){
	//scr.fillStyle = 'rgba(100, 100, 100, 0.7)';
	//scr.fillRect(0,0,canvas.width,canvas.height);
}

function drawApple(){
	scr.fillStyle = "red";
	scr.fillRect(fruit.x * (blockL + 1), fruit.y * (blockL + 1), blockL, blockL);
}

