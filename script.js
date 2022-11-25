const container = document.querySelector(".container");
const shake = document.querySelector("#shake");
const adjust = document.querySelector("#adjust");

shake.addEventListener("click", resetAllSquareColors);
adjust.addEventListener("click", rebuildGrid);
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
}

function colorInSquare() {
    this.classList.add("filled-in");
};

function resetAllSquareColors() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach(sqr => {
        sqr.classList.remove("filled-in");
    });
};

function getUserInput() {
    return prompt("How many squares per side (Must be between 1 and 100)?");
}

function rebuildGrid() {
    const customGridSize = getUserInput();
    generateNewGrid(customGridSize);
}

function generateNewGrid(gridSize) {
    gridSize = Math.floor(gridSize);
    if (verifyValidGrid(gridSize)) {
        removeAllChildNodes(container);
        for (i=0; i<gridSize; i++) {
            const row = document.createElement("div");
            row.classList.add("row");
            container.appendChild(row);
            for (j=0; j<gridSize; j++) {
                const square = document.createElement("div");
                square.classList.add("square");
                row.appendChild(square);
            }
        }
        resetColorEventListeners();
    }
};

function verifyValidGrid(desiredGridSize) {
    try {
        if (isNaN(desiredGridSize)) throw "Must be a number.";
        if (desiredGridSize < 1 || desiredGridSize > 100) throw "Must be between 1 and 100.";
    }
    catch(err) {
        alert(err);
        return false;
    }
    return true;
};

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
};