var gridLength = 10;

var theDojo = [
    [0,0,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
];

// for (var i = 0; i < gridLength; i++){
//     theDojo.push([]);
//     for (var j = 0; j < gridLength; j++){
//         theDojo[i].push(Math.floor(Math.random()*2));
//     }
// }

var theDojoSums = [];

for(var i = 0; i < theDojo.length; i++){
    theDojoSums.push([]);
    for (var j = 0; j < theDojo[i].length; j++){
        theDojoSums[i].push('');
    }
}

var winSum = 0;

for (var i = 0; i < gridLength; i++){
    for (var j = 0; j < gridLength; j++){
        if (theDojo[i][j] === 0){
            winSum++;
        }
    }
}

var dojoDiv = document.querySelector("#the-dojo");

// Creates the rows of buttons for this game
function render(theDojo, theDojoSums) {
  var result = "";
  for(var i=0; i<theDojo.length; i++) {
    for(var j=0; j<theDojo[i].length; j++) {
      result += `<button class="tatami" onclick="howMany(${i}, ${j}, this)" oncontextmenu="flag(${i}, ${j}, this)">${theDojoSums[i][j]}</button>`;
    }
  }
  return result;
}
    
// TODO - Make this function tell us how many ninjas are hiding 
//        under the adjacent (all sides and corners) squares.
//        Use i and j as the indexes to check theDojo.
function howMany(i, j, element) {
    console.log({i, j});
    if (theDojo[i][j] === 0 && theDojoSums[i][j] === ''){
        winSum--;
    }
    
    if(theDojo[i][j] === 0){
        var sum = 0;

        for (var x = i-1; x <= i+1; x++){
            for (var y = j-1; y <= j+1; y++){
                if(x === i && y === j){
                    continue;
                } else if (x >= 0 && y >= 0 && x < theDojo.length && y < theDojo.length){
                    sum += theDojo[x][y];
                }
            }
        }
        theDojoSums[i][j] = sum;
        dojoDiv.innerHTML = render(theDojo,theDojoSums);
    } else {
        alert('You lose! Good day, sir!');
        dojoDiv.innerHTML = renderEndScreen();
    }
    

    console.log(winSum);
    checkWin();
}
    
// BONUS CHALLENGES
// 1. draw the number onto the button instead of alerting it
// 2. at the start randomly place 10 ninjas into theDojo with at most 1 on each spot
// 3. if you click on a ninja you must restart the game 
//    dojoDiv.innerHTML = `<button onclick="location.reload()">restart</button>`;
    
// start the game
// message to greet a user of the game
var style="color:cyan;font-size:1.5rem;font-weight:bold;";
console.log("%c" + "IF YOU ARE A DOJO STUDENT...", style);
console.log("%c" + "GOOD LUCK THIS IS A CHALLENGE!", style);
// shows the dojo for debugging purposes
console.table(theDojo);
// adds the rows of buttons into <div id="the-dojo"></div>  
dojoDiv.innerHTML = render(theDojo, theDojoSums);   

//end screen


function renderEndScreen() { //displays the location of all ninjas and changes their location to an X in theDojoSums. Also redraws the screen to show Xs, and changes all button function to "reload()"
    var result = "";
    for(var i = 0; i < theDojo.length; i++){
        for (var j = 0; j < theDojo[i].length; j++){
            if(theDojo[i][j] === 1){
                theDojoSums[i][j] = 'X';
            }
        }   
    }

    for(var i=0; i<theDojo.length; i++) {
      for(var j=0; j<theDojo[i].length; j++) {
        result += `<button class="tatami" onclick="reload()" oncontextmenu="reload()">${theDojoSums[i][j]}</button>`;
      }
    }
    return result;
}

//reload
function reload() { //resets theDojo and theDojoSums back to empty, then repopulates them using the same code above
    theDojo = [];
    theDojoSums = [];
    winSum = 0;


    event.preventDefault();

    for (var i = 0; i < gridLength; i++){
        theDojo.push([]);
        for (var j = 0; j < gridLength; j++){
            theDojo[i].push(Math.floor(Math.random()*2));
        }
    }

    for(var i = 0; i < theDojo.length; i++){
        theDojoSums.push([]);
        for (var j = 0; j < theDojo[i].length; j++){
            theDojoSums[i].push('');
        }
    }

    for (var i = 0; i < gridLength; i++){
        for (var j = 0; j < gridLength; j++){
            if (theDojo[i][j] === 0){
                winSum++;
            }
        }
    }

    console.table(theDojo);
    dojoDiv.innerHTML = render(theDojo, theDojoSums); 
}

//add flag
function flag(i, j, element){
    event.preventDefault(); //prevents the context menu from popping up when right clicking a square
    if(theDojoSums[i][j] === ''){
        theDojoSums[i][j] = 'F';
    } else if (theDojoSums[i][j] === 'F'){
        theDojoSums[i][j] = '';
    }
    dojoDiv.innerHTML = render(theDojo,theDojoSums);
}

//check win
function checkWin() {
    if (winSum === 0){
        alert('You win!');
        dojoDiv.innerHTML = renderEndScreen();
    }
}