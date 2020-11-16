/*Author - Deryabin Roman*/
window.onload = function(){
	let page = document.querySelector("#page");
	let train = document.querySelector("#train");
	let weels = document.querySelectorAll(".weel");
	let grass = document.querySelector("#grass");
	let btn_horn = document.querySelector("#btn_horn");
	let btn_left = document.querySelector("#btn_left");
	let btn_right = document.querySelector("#btn_right");
	let light = document.querySelector("#light");
	let light_window = document.querySelector("#light_window");
	let horn = document.querySelector("#horn");
	
	let v = 0;
	let speed = 0;
	const max_speed = 10;
	let left_pos = 0;
	let intSmoke;
	let bird_pos;
	let bird_speed;
	let bird_fright;
	let move = setInterval(moveTrain, 20, v);



	function moveTrain(){
		document.onkeydown = document.onkeyup = document.onclick = (e) => {
			console.log(e.target.id);
			//Stright
			if(e.keyCode == 39 && e.type == "keyup" || e.target.id == "btn_right"){
				speed++;
				clearInterval(intSmoke);
				intSmoke = setInterval(letSmoke,2000 - (speed * 100),speed);
				if(speed > max_speed){speed = max_speed;}else{left_pos = left_pos + 5;}
			}
			//Back
			if(e.keyCode == 37 && e.type == "keyup" || e.target.id == "btn_left"){
				speed--;
				clearInterval(intSmoke);
				if(speed) intSmoke = setInterval(letSmoke,2000 - (speed * 100),speed);
				if(speed < 0){speed = 0;}else{left_pos = left_pos - 5;}
			}
			//Horn
			if(e.keyCode == 32 && e.type == "keyup" || e.target.id == "btn_horn"){
				//Sound horn
				var horn_sound = new Audio();	horn_sound.preload = 'auto'; horn_sound.src = 'sound/horn.mp3';
				horn_sound.play();
				horn.style.display = "block";
				setTimeout((e) =>{horn.style.display = "none";},1000); 
				//Find bird
				if(document.getElementById('bird')){
					if(bird.offsetLeft > 300 && bird.offsetLeft < 500){
						bird_speed = 14;
						bird_fright = true;
					}
				}
			}
			//light
			if(e.keyCode == 17 && e.type == "keyup" || e.target.id == "btn_light"){
				if(light.style.display === 'none'){
					light.style.display = 'block';
					light_window.style.display = 'block';
				}else{
					light.style.display = 'none';
					light_window.style.display = 'none';
				}
			}
		}//onkeyup
		v = v + speed;
		weels[0].style.transform = "rotate(-"+ v +"deg)";
		weels[1].style.transform = "rotate(-"+ v +"deg)";
		train.style.left = left_pos+"px";
		page.style.backgroundPositionX = -v+"px , -"+(v/2)+"px, -"+(v/20)+"px, -"+(v/50)+"px, -"+(v/80)+"px, -"+(v/100)+"px";
		grass.style.backgroundPositionX = -(v*2)+"px";
		//Find bird
		if(document.getElementById('bird')){
			//Bitd is fright
			if(bird_fright){
				bird.animate([{top: "150px"},{top: "0px"},{top: "150px"}],1500);
				bird_fright = false;
			}
			if(bird.offsetLeft > 300 && bird.offsetLeft < 500){
				btn_horn.style.background = "red";
			}else{btn_horn.style.background = "white";}
			bird_pos = bird_speed - speed;
			//Remove bird
			if(bird.offsetLeft < - 1000 || bird.offsetLeft > 3000){
				bird.remove();
			}else{
				bird.style.left = bird.offsetLeft + bird_pos + "px";
			}
		}
	}//moveTrain
	function letSmoke(s = 1){
		let smoke = document.createElement("span");
		smoke.classList.add("smoke");
		train.append(smoke);
		smoke.animate([{left: 80 + "px"},{left: 80 + "px"},{left: (80 + s * 10) + "px"},{left: (90 + s * 20) + "px"}],3000);
		setTimeout(() =>{smoke.remove()},3000);
	}//letSmoke
	//Interval append bird
	setInterval((e) =>{
		if(!document.getElementById('bird')){
			let bird = document.createElement("div");
			bird.setAttribute("id","bird");
			bird.style.top = "150px";
			bird_speed = 8;
			if(bird_speed > speed){
				bird_pos = 400;
				bird.style.left = "-"+bird_pos+"px";
			}else{
				bird_pos = 400;
				bird.style.left = bird_pos+ 20 + document.body.clientWidth +"px";
			}
			page.append(bird);
		}
	},10000);
	//Sound train
	setTimeout(soundTrain, 1000);
	function soundTrain(){
		if(speed > 0){
			//Sound train
			var train = new Audio();	
			train.preload = 'auto'; 
			train.src = 'sound/train.mp3';
			train.play();
		}
		setTimeout(soundTrain, 3000/speed);
	}//soundTrain
}