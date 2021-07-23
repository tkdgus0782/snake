

function init(){
	window.canvas = document.getElementById('screen');
	window.scr = canvas.getContext('2d');
	
	window.addEventListener('resize', updateSize);
	
	return new Promise(function(resolve, reject){
		console.log("loading complete!")
		resolve();
	})
}		

function updateSize(){
	window.canvas.width = document.body.clientWidth / 2;
	window.canvas.height = document.body.clientHeight;
}

function play(){
	init().then(loop);
}

function loop(){
	window.playing = setInterval(draw, 10);
}

function gameover(){
	clearInterval(playing);
	scr.clearRect(0,0,canvas.width,canvas.height);
	scr.fillStyle = 'black';
	scr.font = '60px consolas';
	scr.fillText('GAME OVER!!', canvas.width/3, canvas.height/2);
}

function draw(){
	scr.clearRect(0,0,canvas.width,canvas.height);
	drawBackground();
}

function drawBackground(){
	scr.fillStyle = 'rgba(100, 100, 100, 0.7)';
	scr.fillRect(0,0,canvas.width,canvas.height);
}

