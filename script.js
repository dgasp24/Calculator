const container = document.querySelector(".buttonContainer");
const mainText = document.querySelector("#answers")
const history = document.querySelector("#textHistory");
const clear = document.querySelector("#clear");

container.addEventListener("click", (e) =>{
    if(!e.target.matches("button")) return;

    const value = e.target.textContent;
    if(mainText.textContent != ""){
        clear.textContent = "C";
    }
    checkValue(value);

});

function checkValue(value){
      if(value == "X"){value = "*"};

    if(value === "AC"){
        history.textContent = "";
        mainText.textContent = "";
        return;
    }else if(value === "C"){
         history.textContent = "";
         mainText.textContent = ""
         clear.textContent = "AC";
         return;
    }
    if(value === "="){
        if("+/-*".includes(mainText.textContent.slice(-1))){
            mainText.textContent = "ERROR";
            return;
        }if(mainText.textContent != "ERROR"){
            history.textContent = `${mainText.textContent}`;
            mainText.textContent = parseFloat(eval(mainText.textContent).toFixed(4));
        }
        return;
    }
    if(value === "<"){
        mainText.textContent = mainText.textContent.slice(0,-1);
        return;
    }
    if(value === "+/-"){
        mainText.textContent = -1 * eval(mainText.textContent);
        return;
    }

    if ("+/-*".includes(value)) {
    // and last character is ALSO an operator → replace it
    if ("+/-*".includes(mainText.textContent.slice(-1))) {
        mainText.textContent = mainText.textContent.slice(0, -1) + value;
        return;
    }
}

    
    mainText.textContent += value;
}