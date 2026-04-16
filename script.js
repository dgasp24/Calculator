const container = document.querySelector(".buttonContainer");
const mainText = document.querySelector("#answers")
const history = document.querySelector("#textHistory");

container.addEventListener("click", (e) =>{
    if(!e.target.matches("button")) return;

    const value = e.target.textContent;

    if(value == "X"){value = "*"};

    if(value === "AC"){
        history.textContent = "";
        mainText.textContent = ""
        return;
    }
    if(value === "="){
        history.textContent = `${mainText.textContent}`;
        mainText.textContent = parseFloat(eval(mainText.textContent).toFixed(4));
        return;
    }
    if(value === "<"){
        mainText.textContent = mainText.textContent.slice(0,-1);
        return;
    }

    mainText.textContent += value;
});