const container = document.querySelector(".buttonContainer");
const mainText = document.querySelector("#answers")
const history = document.querySelector("#textHistory");
const clear = document.querySelector("#clear");

container.addEventListener("click", (e) =>{
    if(!e.target.matches("button")) return;

    let value = e.target.textContent;
    if(mainText.textContent != ""){
        clear.textContent = "C";
    }
    checkValue(value);
});

function checkValue(value){
    if(value == "X") value = "*";

    if(value === "AC"){
        history.textContent = "";
        mainText.textContent = "";
        return;
    }
    
    if(value === "C"){
        history.textContent = "";
        mainText.textContent = "";
        clear.textContent = "AC";
        return;
    }

    if(value === "( )"){
        const current = mainText.textContent;
        const opens = (current.match(/\(/g) || []).length;
        const closes = (current.match(/\)/g) || []).length;
        if(opens === closes){
            mainText.textContent += '(';
        } else {
            mainText.textContent += ')';
        }
        return;
    }

    if(value === "="){
        if("+-*/".includes(mainText.textContent.slice(-1))){
            mainText.textContent = "ERROR";
            return;
        }
        if(mainText.textContent != "ERROR"){
            history.textContent = `${mainText.textContent}`;
            mainText.textContent = parseFloat(eval(mainText.textContent).toFixed(10));
        }
        return;
    }

    if(value === "<"){
        mainText.textContent = mainText.textContent.slice(0, -1);
        return;
    }

    if(value === "+/-"){
        const current = mainText.textContent;
        let lastOpIndex = -1;
        let depth = 0;
        for(let i = current.length - 1; i >= 0; i--){
            const ch = current[i];
            if(ch === ')') depth++;
            if(ch === '(') depth--;
            if(depth === 0 && '+-*/'.includes(ch)){
                lastOpIndex = i;
                break;
            }
        }
        if(lastOpIndex === -1){
            mainText.textContent = current.startsWith('(-')
                ? current.slice(2, -1)
                : `(-${current})`;
        } else {
            const before = current.slice(0, lastOpIndex + 1);
            const lastNum = current.slice(lastOpIndex + 1);
            if(lastNum.startsWith('(-')){
                mainText.textContent = before + lastNum.slice(2, -1);
            } else {
                mainText.textContent = before + `(-${lastNum})`;
            }
        }
        return;
    }

    if("+-*/".includes(value)){
        if("+-*/".includes(mainText.textContent.slice(-1))){
            mainText.textContent = mainText.textContent.slice(0, -1) + value;
            return;
        }
    }

    mainText.textContent += value;
}