function updateTime() {
    const now = newData();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocalDateString();
    const fullString = '${dateString} ${timeString}';

    document.getElementById('datetime').textContent = fullString;   
}

setInterval(updateTime, 1000);

updateTime();