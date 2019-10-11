document.addEventListener('DOMContentLoaded', function() {
  player1Wins = 0; // for player wins or loses global scoped.
  player2Wins = 0;
 
  checkArray = ['012', '345', '678', '258', '036', '246', '048', '147']; // global scope..
        // 3 
  let tempO = []; // for player with O input ,to insert strings into array
  let tempX = [];
  pressNewGame = null;
  howManyImages = 0;
  let playerIndex = 1; // Which player's turn
  let imageIs = 'o';
  const buttons = document.querySelector('main');

  buttons.addEventListener('click', function(e) {
    if(pressNewGame !== null) {  // if someone won then not allowed to set O or X.!
      alert('press new game button at bottom.');
    } else {
        if(e.target.nodeName === 'BUTTON' && e.target.classList.contains('options')) {
          const id = e.target.getAttribute('id');
          setImage(imageIs, e.target, id, playerIndex);    
          if(playerIndex == 1) { 
            tempO.push(id);
            if(tempO.length >= 3) {
              checkForWIn(playerIndex, tempO);
            }
            playerIndex = 2;
            imageIs = 'x';
        
          } else {          
              tempX.push(id);
              if(tempX.length >= 3) {
                checkForWIn(playerIndex, tempX);
              }
              playerIndex = 1;
              imageIs = 'o';
          }      
        } else if(e.target.nodeName === 'IMG') { // for wrong clicks on selected buttons. safely.      
              alert(`it's already selected.`);
          } 
    } 
  });
  const newGame = document.querySelector('.new-game');
  newGame.addEventListener('click', function(e) {
    let images = document.querySelectorAll('img');
    for(image of images) {
      image.style.display = 'none';
      playerIndex = 1;   // setting variables to appropriate values for next game.
      imageIs = 'o';
      
    }
    howManyImages = 0; // setting reference globls to appropriate values.
    pressNewGame = null;
    tempO = [];
    tempX = [];
    
  });
});

function checkForWIn(playerIndex, tempArray) {
  let string = '';
  tempArray.sort();

  for(let i = 0; i < tempArray.length; i++) {
    string = string + tempArray[i].toString();
  }
  
  let j = true;

  for(let i = 0; i < checkArray.length; i++) {

    if(string.includes(checkArray[i].toString())) {
      alert(`Player ${playerIndex} Won this match.`);
      pressNewGame = true;
      tempO = [];// emptying the stored values of Player With O img and X img.. 
      tempX = [];
      j = false;
      string = ``;
      if(playerIndex == 1) {
        player1Wins++;
      } else {
        player2Wins++;
      }
      settingFooter(playerIndex, player1Wins, player2Wins);
         
    }
    if(string.length >= 4) { // the problem accures when length is greater then 3 
            // suppose when user input four values not necessarily in order then this is the trick that i used to solve . 
      let stArray = string.split('');
      let j = 0;
      let inputArray = checkArray[i].toString().split('');
      for(let k = 0; k < stArray.length; k++) {
        for(let l = 0; l < inputArray.length; l++) {
          if(stArray[k] == inputArray[l]) {
            j++;
          }
        }
        if(k == (stArray.length - 1)) {
          if(j == 3) {
            alert(`Player ${playerIndex} Won this match.`);
            pressNewGame = true;
            //string = `player${playerIndex}`
            tempO = [];// emptying the stored values of Player With O img and X img.. 
            tempX = [];
            j = false;
            string = ``;
            if(playerIndex == 1) {
              player1Wins++;
            } else {
              player2Wins++;
            }          
            settingFooter(playerIndex, player1Wins, player2Wins);
          }
          
        }
      }
      j = 0;
    }
  }
  if(j !== false && howManyImages > 8 ) {
    alert(`Match is tie.`);
  }
}
  
function settingFooter(playerIndex, player1Wins, player2Wins) {
  let footer = document.querySelectorAll('.score span');
  if(playerIndex == 1) {
    footer[0].textContent = `Wins: ${player1Wins}`;
  } else {
    footer[1].textContent = `Wins: ${player2Wins}`;
  }
}

function setImage(whichImg, tag, playerIndex) {
  let img = document.createElement('img');
  howManyImages++;
  if(whichImg === 'o') {    // creating img not set based on which img to chose from.
    img.setAttribute('src',"o.png");
    img.classList.add('options');
  } else {
    img.setAttribute('src',"x.png");
    img.classList.add('options');
  }
  img.style.padding = '0px';
  img.style.right = '12px';
  img.style.bottom = '0px';
  img.style.top = '0px';
  img.style.width = '146px';
  img.style.height = '136px';
  img.classList.add(`p${playerIndex}`);    
  img.style.position = 'inherit';
  tag.insertAdjacentElement('afterbegin', img);
}

