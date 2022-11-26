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
        sqr.addEventListener("mouseover", adjustSquareColor);
    });
};

function adjustSquareColor() {
    const previousSquareColor = this.style.backgroundColor;
    let newSquareColor;
    if (previousSquareColor) {
        newSquareColor = modifyString(previousSquareColor);
    } else {
        newSquareColor = "rgb(223,223,223)";
    };
    this.style.backgroundColor = newSquareColor;
};

function modifyString(rgbValue) {
    const openBracket = rgbValue.indexOf("(");
    const firstComma = rgbValue.indexOf(",");
    const secondComma = rgbValue.indexOf(",", (firstComma+1));
    const closeBracket = rgbValue.indexOf(")");
    const originalRed = rgbValue.substring(openBracket+1,firstComma);
    const originalGreen = rgbValue.substring(firstComma+2,secondComma);
    const originalBlue = rgbValue.substring(secondComma+2,closeBracket);
    const newRed = parseInt(originalRed)-32;
    const newGreen = parseInt(originalGreen)-32;
    const newBlue = parseInt(originalBlue)-32;
    return `rgb(${newRed.toString()},${newGreen.toString()},${newBlue.toString()})`;
};

function resetAllSquareColors() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(sqr => {
        sqr.style.backgroundColor = '';
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