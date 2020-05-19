const container = document.querySelector(".grid");
//creating image tag to display mario image
var marioImg = document.createElement("img");
marioImg.src = "https://i.postimg.cc/5N90KcJ8/mario.jpg";
marioImg.id = "mario00"
marioImg.style.width = "20px";
marioImg.style.height = "20px";

let randomArr = []; //array with random number to display mushroom image
let gridWidth = 10;
let gridHeight = 10;
let position = { x: 0, y: 0 }; //moving cursor position
const keys = {
    left: 37,
    up: 38,
    right: 39,
    down: 40
};
//"https://i.postimg.cc/5N90KcJ8/mario.jpg"
//"https://i.postimg.cc/SKktCGCQ/mashroom.jpg"



let combinationArr = []; // array of all combinations that can come into a matrix of given rows,column
function gridNumber(gridWidth, gridHeight) {
    if(!gridWidth || !gridHeight){
        return 
    }
    combinationArr = []
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            combinationArr.push(i + "" + j)
        }
    }
    makeGrid(gridWidth, gridHeight);
}

// function creating grid
//@rows -number of rows to be created 
//@cols - number of columns to be created
function makeGrid(rows, cols) {
    container.style.setProperty("--grid-rows", rows);
    container.style.setProperty("--grid-cols", cols);
    for (let i of combinationArr) {
        let cell = document.createElement("div");
        container.appendChild(cell).className = "grid-item grid-item-" + i;
    }
    //setting mario image on first grid ie - 00
    let firstGrid = document.querySelector(".grid-item");
    firstGrid.appendChild(marioImg);
    randomMashroom()
}

//function to place mushroom images in grid
function randomMashroom() {
    var arr = [];
    let _combinationArr = combinationArr.shift(); // removing 00 element from array as mario will be place on it on load 
    // creating array of random numbers from all combinations 
    // array length will be the given number to form grid
    while (arr.length < gridWidth) {
        var r = combinationArr[Math.floor(Math.random() * combinationArr.length)];
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    randomArr = arr;
    //if there is any number with single digit
    //adding 0 so iamge can be placed on grid 
    for (let i of arr) {
        if (i.toString().length == 1) {
            i = "0" + i
        }
        //placing mashroom on random numbers
        var mashroomImg = document.createElement("img");
        mashroomImg.src = "https://i.postimg.cc/SKktCGCQ/mashroom.jpg";
        mashroomImg.id = "mashroom" + i;
        mashroomImg.style.width = "20px";
        mashroomImg.style.height = "20px";
        let mushroomIm = document.getElementsByClassName("grid-item grid-item-" + i);
        mushroomIm[0].appendChild(mashroomImg)
    }
}


function alterWidthInput() {
    gridWidth = prompt("Please enter board width");
    alterHeightInput();
}
function alterHeightInput() {
    gridHeight = prompt("Please enter board height");
    gridNumber(gridWidth, gridHeight)
}
alterWidthInput()


var count = 0; //number of moves of mario to complete eating mashroom
var lastPosition = 00; // checking last position of mario so we can remove image form it 

//function to make mario moving, placing image of mario and 
//removing image of mashroom if its grid number matches
function handleMario(e) {

    //storing last position of mario
    lastPosition = position.x + "" + position.y;

    //moving mario image
    switch (e.keyCode) {
        case keys.left:
            position.y--;
            break;
        case keys.up:
            position.x--;
            break;

        case keys.right:
            position.y++;
            break;

        case keys.down:
            position.x++;
            break;
    }
    //move image to its last or first grid element
    if (position.x == gridWidth) {
        position.x = position.x - gridWidth;
    }
    if (position.y == gridHeight) {
        position.y = position.y - gridHeight;
    }
    if (position.x < 0) {
        position.x = gridWidth - 1;
    }
    if (position.y < 0) {
        position.y = gridHeight - 1;
    }
    count = count + 1;

    var marioImg = document.createElement("img");
    marioImg.src = "https://i.postimg.cc/5N90KcJ8/mario.jpg";
    marioImg.id = "mario" + position.x + '' + position.y
    marioImg.style.width = "20px";
    marioImg.style.height = "20px";
    //removing last image of mario 
    var image_x = document.getElementById("mario" + lastPosition);
    image_x.parentNode.removeChild(image_x);
    
    //placing mario image on moving 
    let gridItem = document.querySelector(".grid-item-" + position.x + '' + position.y);
    gridItem.appendChild(marioImg);

    //removing image of mashroom if mario and mashroom grid element matches
    for (let i of randomArr) {
        if (position.x + '' + position.y == i) {
            var image_x = document.getElementById("mashroom" + position.x + '' + position.y);
            image_x.parentNode.removeChild(image_x);
        }
    }
    //if all mashroom are eaten then show a alert of game over
    randomArr = randomArr.filter(item => item !== (position.x + '' + position.y));
    if (!randomArr.length) {
        alert("Game Over. Total moves to save mario : " + count)
        clearInterval(inter);
        window.location.reload();
    }
}

// storing interval
var inter;

// function renders when we press any arrow key 
function continueLoop(e) {
    var c = 0
    clearInterval(inter);
    inter = setInterval(() => {
        // mario keeps on moving untill any other key pressed or its count of heigth*width completed
        if (c < gridHeight*gridWidth) {
            c = c + 1;
            handleMario(e)
        }
    }, 500)
}

document.addEventListener("keydown", continueLoop, false);