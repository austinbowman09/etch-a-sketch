const gridContainer = document.querySelector(".grid-container");
const shake = document.querySelector("#shake");
const adjust = document.querySelector("#adjust");

shake.addEventListener("click", resetAllSquareColors);
adjust.addEventListener("click", rebuildCustomGrid);
initializePage();

function initializePage() {
    const defaultGridSize = 50;
    generateNewGrid(defaultGridSize);
};

function resetColorEventListeners() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(sqr => {
        sqr.addEventListener("mouseover", colorInSquare);
    });
};

function colorInSquare() {
    this.style.backgroundColor = getRandomColor();
    console.log(getRandomColor());
};

function getRandomColor() {
    const red = getRandomNumber();
    const green = getRandomNumber();
    const blue = getRandomNumber();
    return `rgb(${red.toString()},${green.toString()},${blue.toString()})`;
}

function getRandomNumber() {
    return Math.floor(Math.random()*255);
}

function resetAllSquareColors() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(sqr => {
        sqr.classList.remove("filled-in");
    });
};

function getUserInput() {
    return prompt("How many squares per side (Must be between 1 and 100)?");
};

function rebuildCustomGrid() {
    const customGridSize = getUserInput();
    generateNewGrid(customGridSize);
};

function generateNewGrid(gridSize) {
    gridSize = Math.floor(gridSize);
    if (verifyValidGrid(gridSize)) {
        removeAllChildNodes(gridContainer);
        for (i=0; i<gridSize; i++) {
            const row = document.createElement("div");
            row.classList.add("row");
            gridContainer.appendChild(row);
            for (j=0; j<gridSize; j++) {
                const square = document.createElement("div");
                square.classList.add("square");
                row.appendChild(square);
            };
        };
        resetColorEventListeners();
    };
};

function verifyValidGrid(desiredGridSize) {
    try {
        if (isNaN(desiredGridSize)) throw "Must be a number.";
        if (desiredGridSize < 1 || desiredGridSize > 100) throw "Must be between 1 and 100.";
    }
    catch(err) {
        alert(err);
        return false;
    };
    return true;
};

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
};