let userMove = '';
       
let result = '';

const score =  JSON.parse(localStorage.getItem("score")) || {Wins:0, Loses:0, Ties:0, totalPlays:0};


function game(userMove){
    const computerMove =pickComputerMove();
    if(userMove==='Scissors'){
        if (userMove === computerMove)
        {
            result='Tie';
        }
        else if(computerMove === 'Rock')
        {
            result='You Lose';
        }
        else if(computerMove === 'Paper')
        {
            result='You Win';
        }
       
    } 
    
    else if(userMove==='Paper'){
        if (userMove === computerMove)
        {
            result='Tie';
        }
        else if(computerMove === 'Scissors')
        {
            result='You Lose';
        }
        else if(computerMove === 'Rock')
        {
            result='You Win';
        }
      
    }
    
    else if(userMove==='Rock'){
        if (userMove === computerMove)
        {
            result='Tie';
        }
        else if(computerMove === 'Paper')
        {
            result='You Lose';
        }
        else if(computerMove === 'Scissors')
        {
            result='You Win';
        }   
    }

    if (result === 'You Win'){
            score.Wins++;
        }else if(result === 'You Lose'){
            score.Loses++;
        }else if (result === 'Tie'){
            score.Ties++;
        }

    score.totalPlays=score.Loses+score.Ties+score.Wins;    

        localStorage.setItem('score', JSON.stringify(score)); 
        document.querySelector('.result').innerText=result;
        
        document.querySelector('.compare-result').innerHTML=` You
        <img src="rockpaperscissors/${userMove}-emoji.png" class="move-icon" alt="">
        vs Computer
        <img src="rockpaperscissors/${computerMove}-emoji.png" class="move-icon" alt="">`;

        document.querySelector('.js-score').innerText=`Wins: ${score.Wins} | Loses: ${score.Loses} | Ties: ${score.Ties} | Total plays:${score.totalPlays}`;

   /* alert(`You picked ${userMove}. Computer picked ${computerMove}. ${result}.\nWins: ${score.Wins} Loses: ${score.Loses} Ties: ${score.Ties}`)   */ 
}
let isAutoPlaying = false;
let intervalId=0;
function autoPlay(){
    if(!isAutoPlaying){
       intervalId = setInterval(function(){
                        const userMove=pickComputerMove();
                        game(userMove);
                    },1000);
        isAutoPlaying = true;
        document.querySelector(".green-dot").classList.add("green-dot-active");
    }else{
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector(".green-dot").classList.remove("green-dot-active");
    }
   
} 


function resetScore(){
    score.Wins=0;
    score.Loses=0;
    score.Ties=0;
    localStorage.removeItem('score')
    document.querySelector('.js-score').innerText=`Wins: ${score.Wins} Loses: ${score.Loses} Ties: ${score.Ties}`;
   /* alert(`Your Score has been reset.\nWins: ${score.Wins} Loses: ${score.Loses} Ties: ${score.Ties}`)*/
}

function pickComputerMove() {
    const randomNumber=Math.random();
    let computerMove = '';
    if (randomNumber > 0 && randomNumber <= 1 / 3) {
        computerMove = 'Rock';
    } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
        computerMove = 'Paper';
    } else {
        computerMove = 'Scissors';
    }
    return computerMove;
}


