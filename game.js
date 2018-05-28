window.onload = function() {
	canvas = document.getElementById("game");
	
	canvas.width = 500;
	canvas.height = 500;

	context= canvas.getContext("2d");

	document.addEventListener("keydown", keyPush);
	// update the canvas 15 times per second 
	// i.e. frame rate
	setInterval(game, 1000/15);
}

player_x = player_y = 25;

velocity_x = velocity_y = 0;

trail = [];

// initial length of the tail
tail = 5;

grid_size = 10;
tile_count_x = 50;
tile_count_y = 50;

grid_height = window.innerHeight;
grid_width = window.innerWidth;

score = 0;
highscore = 0;

// goal init location
goal_x =  goal_y = 5;

previous_key_code = 0;

function game(){

	document.getElementById("score").innerHTML = score;
	document.getElementById("highscore").innerHTML = highscore;
	
	//update position of the snake
	player_x += velocity_x;
	player_y += velocity_y;

	if(player_x < 0){
	
		player_x = tile_count_x - 1;
	}

	if(player_x > tile_count_x - 1){
		
		player_x = 0;
	
	}

	if(player_y < 0){
	
		player_y = tile_count_y - 1;
	
	}

	if(player_y > tile_count_y - 1){
		
		player_y = 0;
	
	}		
	
	context.fillStyle = "black";
	context.fillRect(0,0, grid_width, grid_height);
	
	context.fillStyle = "orange";
	//draw snake
	for(var i=0; i<trail.length; i++){
	
		context.fillRect(trail[i].x*grid_size, trail[i].y*grid_size,grid_size-3, grid_size-3);
		
		if(trail[i].x == player_x && trail[i].y == player_y) {
			tail = 5;

			if(score > highscore)
				highscore = score;

			score = 0;
				
		}
		
	}

	trail.push({x: player_x, y:player_y});
	
	while(trail.length > tail){
		trail.shift();
	}

	if(player_x == goal_x && player_y == goal_y){
		tail++;
		score+=10;
		goal_x = Math.floor(Math.random()*tile_count_x);
		goal_y = Math.floor(Math.random()*tile_count_y);
	}

	context.fillStyle = "red";
	context.fillRect(goal_x*grid_size, goal_y*grid_size, grid_size-2, grid_size-2);
				
}

function keyPush(event) {

	switch(event.keyCode) {

		case 37:
			if(previous_key_code == 39)
				return;
			velocity_x = -1;
			velocity_y = 0;
			break;

		case 38:
			if(previous_key_code == 40)
				return;
			velocity_x = 0;
			velocity_y = -1;
			break;
		
		case 39:
			if(previous_key_code == 37)
				return;
			velocity_x = 1;
			velocity_y = 0;
			break;
		
		case 40:
			if(previous_key_code == 38)
				return;
			velocity_x = 0;
			velocity_y = 1;
			break;
	}
	previous_key_code = event.keyCode;
}
