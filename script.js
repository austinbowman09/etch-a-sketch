const container = document.querySelector(".container");


//Create a row using javascript



for (i=0; i<16; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);
    for(j=0; j<16; j++) {
        const square = document.createElement("div");
        square.classList.add("square");
        row.appendChild(square);
    }
}




//Loop through 16 times and append each div

//Add a second loop to loop through 16 rows

//Add css classes to set flexbox properties