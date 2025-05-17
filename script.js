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
const userTypedEl = document.getElementById('user-typed');
const responseEl = document.getElementById('response');

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
  
  
function handleKeypress(event) {
    if (event.key.length === 1) {
        userInput += event.key;
    } else if (event.key === "Backspace") {
        userInput = userInput.slice(0, -1);
    } else if (event.key === "Enter") {
        const inputLower = userInput.toLowerCase();

        if (state === "initial") {
            document.removeEventListener('keydown', handleKeypress);
            document.querySelector('.cursor').style.display = 'none';

            responseEl.textContent = "...";
            setTimeout(() => {
                responseEl.textContent = "Thank you for your response.";
                setTimeout (() => {
                    responseEl.textContent = "...";
                    setTimeout(() => {
                        responseEl.textContent = "Would you like to stay or move on?";
                        state = "prompt";
                        userInput = "";
                        userTypedEl.textContent = "";
                        document.addEventListener('keydown', handleKeypress);
                        document.querySelector('.cursor').style.display = 'inline-block';
                    }, 1500);
                }, 2000);
            }, 2000);
            return;
        }
        
        if (state === "prompt") {
            if (inputLower.includes("move")) {
                responseEl.innerHTML = 'Thank you for talking with me. Sometimes it\'s best to <a href="main.html">move on</a>.';
                state = "done";
            } else if (inputLower.includes("stay")) {
              const question = questionBank[Math.floor(Math.random() * questionBank.length)];
              responseEl.textContent = question;
              state = "question";
            } else {
                responseEl.textContent = "I am not programmed to help you with that. Would you like to stay or move on?"
            }
            userInput = "";
            userTypedEl.textContent = "";
            return;
        }

        if (state === "question") {
            responseEl.innerHTML = 'Thank you for talking with me. I am only programmed to ask you one question a day. Sometimes it\'s best to <a href ="main.html">move on</a>.';
            state = "done";
            userInput = "";
            userTypedEl.textContent = "";
            return;
        }
    }

    userTypedEl.textContent = userInput;
}

document.addEventListener('keydown', handleKeypress);
  
  // Focus the main container to allow typing
  document.querySelector('main').focus();
  