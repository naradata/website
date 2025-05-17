const questionBank = [
    "Do you regret anything?",
    "Is there anybody you need to apologize to?",
    "Do you believe you deserve more?",
    "If you had to do it all over again, would you?",
    "Do you know why you keep going?",
    "Do you believe in starting over?",
    "Do you ever think about how different your life would be if that one thing never happened?",
    "Do you believe you can change your past?",
];

let state = "initial";
let userInput = "";
const userTypedEl = document.getElementById("user-typed");
const cursorEl = document.querySelector(".cursor");

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString(); // "10:42:15 AM"
    const dateString = now.toLocaleDateString(); // "5/16/2025"
    const fullString = `${dateString} ${timeString}`;
  
    const datetimeEl = document.getElementById('datetime');
    if (datetimeEl) {
      datetimeEl.textContent = fullString;
    }
  }
  
  setInterval(updateTime, 1000);
  updateTime();
  
  
function addToLog(text, isHTML = false) {
    const logEl = document.getElementById("log");
    const p = document.createElement("p");
    if (isHTML) {
        p.innerHTML = text;
    } else {
        p.textContent = text;
    }
    logEl.appendChild(p);

    const userLine = document.querySelector(".user-line");
    logEl.parentNode.appendChild(userLine);

}

function handleKeypress(event) {
    if (event.key.length === 1) {
        userInput += event.key;
    } else if (event.key === "Backspace") {
        userInput += userInput.slice(0,-1);
    } else if (event.key === "Enter") {
        const inputLower = userInput.toLowerCase();

        addToLog(">" + userInput);
        userInput = "";
        userTypedEl.textContent = "";

        if (state === "initial") {
            document.removeEventListener("keydown", handleKeypress);
            cursorEl.style.display = "none";

            addToLog("...");
            setTimeout(() => {
                addToLog("Thank you for your response.");
                setTimeout(() => {
                    addToLog("...");
                    setTimeout(() => {
                        addToLog("Would you like to stay or move on?");
                        state = "prompt";
                        document.addEventListener("keydown", handleKeypress);
                        cursorEl.style.display = "inline-block";
                    }, 1500);
                }, 2000);
            }, 2000);
            return;
        }
        if (state === "prompt") {
            if (inputLower.includes("move")) {
                addToLog("...");
                setTimeout(() => {
                    addToLog(
                        'Thank you for talking with me. Sometimes it\'s best to <a href="main.html">move on</a>',
                        true
                    );
                }, 1500);
                state = "done";     
            } else if (inputLower.includes("stay")) {
                addToLog("...");
                setTimeout(() => {
                    const question = questionBank[Math.floor(Math.random() * questionBank.length)];
                    addToLog(question);
                    state = "question";
                }, 1500);
            } else {
                addToLog("I am not programmed to help you with that. Would you like to stay or move on?");
            }
            return;
        }

        if (state === "question") {
            addToLog("...");
            setTimeout(() => {
                addToLog(
                    'Thank you for talking with me. I am only programmed to ask you one question a day. Sometimes it\'s best to <a href="main.html">move on</a>.',
                    true
                );
                state = "done";
            }, 1500);
            return;
        }
    }

    userTypedEl.textContent = userInput;
}

addToLog("What do you believe in?");

document.addEventListener("keydown", handleKeypress);
document.querySelector("main").focus();
