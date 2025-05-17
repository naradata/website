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
  
  let userInput = "";
  const userTypedEl = document.getElementById('user-typed');
  
  document.addEventListener('keydown', function(event) {
    if (event.key.length === 1) {
      userInput += event.key;
    } else if (event.key === "Backspace") {
      userInput = userInput.slice(0, -1);
    } else if (event.key === "Enter") {
      console.log("User submitted:", userInput);
    }
  
    userTypedEl.textContent = userInput;
  });
  
  // Focus the main container to allow typing
  document.querySelector('main').focus();
  