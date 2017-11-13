let startRes = document.getElementById("startReset");
    timer = document.querySelector("#countDown-value"),
    scoreVal = document.getElementById("scorevalue"),
    playing = false,
    score = 0,
    countDownTimer = 60; 
let correctAnswer; 


//if start/reset is clicked
startRes.onclick = function() {
    //if playing
    if(playing == true) {
    	//reload page
    	location.reload();
    } else {
    	restartGame();
    }
};

// ==========================
//        FUNCTIONS
// ==========================

// Start count down
function startCountDown() {
	action = setInterval(function() {
		// set the value of the countdown to 60 and lower by 1 every second
		timer.innerHTML = countDownTimer;
		//reduce time by 1sec in loops
	    countDownTimer -= 1;
		stopCountDown();
	
	}, 1000);
}

// Stop count down
function stopCountDown() {
	if(countDownTimer == -1) {
		clearInterval(action);
		show("gameOver");
		gameOver.innerHTML = '<p>game over</p> <p>Your score is ' + score + '</p>';
		hide("countDown");
		hide("correct");
		hide("wrong");
		playing = false;
		startRes.innerHTML = "Start Game";
	}
}

// Restart the game
function restartGame() {
	playing = true;
	
	//change button to reset
	startRes.innerHTML = "Reset Game";
	
	//show countdown box and init time
	show("countDown");
	countDownTimer = 60;

	// Countdown function
	startCountDown();

	scoreVal.innerHTML = score;
	hide("gameOver");

	// Generate Q&A
	generateQA();
}

// Show elements
function show(Id) {
	document.getElementById(Id).style.display = "block";
};

// Hide elements
function hide(Id) {
	document.getElementById(Id).style.display = "none";
};

function generateQA() {
	let x = 1 + Math.round(9 * Math.random());
	let y = 1 + Math.round(9 * Math.random());
	correctAnswer = x * y;
	document.getElementById("outputBox").innerHTML = x + " x " + y;
	let correctPos = 1 + Math.round(3 * Math.random());

	// Fill one box with the correct answer
	document.getElementById("box" + correctPos).innerHTML = correctAnswer;

	// Wrong Answers

	let answers = [correctAnswer];

	for(let i = 1; i < 5; i++) {
		if(i != correctPos) {
			
			var wrongAnswer;

			do {
				wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
			} while(answers.indexOf(wrongAnswer) > -1 );

			document.getElementById("box" + i).innerHTML = wrongAnswer;
			answers.push(wrongAnswer);
		}
	}
}

for(i = 1; i < 5; i++) {
	document.getElementById("box"+i).onclick = function() {
		// Check if playing
		if(playing == true) {
			if(this.innerHTML == correctAnswer) {
				// Increase score by 1
				score++;
				scoreVal.innerHTML = score;
				
				hide("wrong");
				show("correct");
				setTimeout(function(){
					hide("correct");
				}, 1000);

				// Generate new QA
				generateQA();

			} else {
				show("wrong");
				hide("correct");
				setTimeout(function(){
					hide("wrong");
				}, 1000);
			}
		}
	};
}
    
    
      //timeleft?
        //yes -> continue
        //no -> gameover
    
    //generate new Q&A

    //if answer box is clicked
      //if playing
        //correct?
          //yes
              //increase score
              //show correct box for 1sec
              //generate new Q&A
          //no
              //show try again box for 1sec