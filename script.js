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
  