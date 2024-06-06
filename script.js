let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newgameBtn = document.querySelector("#newgame-btn");
let message = document.querySelector("#message");
let msg_container = document.querySelector(".msg-container");

let currentTurn = "Player X";
let boxMarkedCount = 0;

const winningPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

resetBtn.addEventListener ("click", () => {
    Reset();
})

newgameBtn.addEventListener ("click", Reset)

function BoxMarked (box) {
    if(currentTurn === "Player X"){
        box.innerHTML = "X";
        currentTurn = "Player O";
    }
    else {
        box.innerHTML = "O";
        currentTurn = "Player X";
    }

    box.disabled = true;
    boxMarkedCount++;
    CheckWinner();    
}

boxes.forEach ((box) => {
    box.addEventListener("click", function () {
        BoxMarked(box)
    })
});

const DisableBoxClick = () => {
    for(let box of boxes){
        box.disabled = true
    }  
}

const CheckDraw = (p1, p2, p3) => {
    if(boxMarkedCount > 8) {
        message.innerHTML = "Oops! Game Draw."
        msg_container.classList.remove("hide");
        DisableBoxClick();
    }
}

function CheckWinner() {
    for(let pattern of winningPattern){
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                message.innerHTML = pos1Val === "O"? "O is Winner":"X is Winner";
                msg_container.classList.remove("hide");

                DisableBoxClick();
            }
            else {

                CheckDraw(pos1Val, pos2Val, pos3Val);
            }
        }
    }

}

function Reset () {
    currentTurn = "Player X";
    boxMarkedCount = 0;

    msg_container.classList.add("hide");
    
    boxes.forEach ((box) => {
        box.innerHTML = "";
        box.disabled = false;
    })
}