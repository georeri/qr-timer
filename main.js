
const timer = {
    short: 7,
    break: 17,
    hour: 60,
    custom: 0,
};

let interval;

const urlParams = new URLSearchParams(window.location.search);
const endHour = Number.parseInt(urlParams.get('endHour'));
const endMinute = Number.parseInt(urlParams.get('endMinute'));



// Takes a timestamp and finds the diff between current time and end time in milliseconds
function getRemainingTime(endTime) {
    const currentTime = Date.parse(new Date());
    const difference = endTime - currentTime;

    const total = Number.parseInt(difference / 1000, 10);
    const hours = Number.parseInt((total / 60 / 60), 10);
    const minutes = Number.parseInt((total / 60) % 60, 10);
    const seconds = Number.parseInt(total % 60, 10);

    return {
        total,
        hours,
        minutes, 
        seconds
    };
}

function startTimer() {
    let { total } = timer.remainingTime;
    const endTime = Date.parse(new Date()) + total * 1000;

    interval = setInterval(function() {
        timer.remainingTime = getRemainingTime(endTime);
        updateClock();

        total = timer.remainingTime.total;
        if (total <= 0) {
            clearInterval(interval);
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(interval);

}

function updateClock() {
    const { remainingTime } = timer;
    const hours = `${remainingTime.hours}`.padStart(2, '0');
    const minutes = `${remainingTime.minutes}`.padStart(2, '0');
    const seconds = `${remainingTime.seconds}`.padStart(2, '0');

    const hour = document.getElementById('js-hours');
    const min = document.getElementById('js-minutes');
    const sec = document.getElementById('js-seconds');
    hour.textContent = hours;
    min.textContent = minutes;
    sec.textContent = seconds;
}

function initalizeTimer() {

    var goalTime = new Date();
    goalTime.setHours(endHour);
    goalTime.setMinutes(endMinute);
    var remTime = getRemainingTime(goalTime);
    
    timer.remainingTime = remTime;
    
    startTimer();
}

function updateURL() {
    const thisURL = document.getElementById('js-url');
    thisURL.value = window.location.href;
}

var qrcode = new QRCode("qrcode");

function makeCode () {    
  var elText = document.getElementById("js-url");
  
  if (!elText.value) {
    alert("Input a text");
    elText.focus();
    return;
  }
  
  qrcode.makeCode(elText.value);
}

document.addEventListener('DOMContentLoaded', () => {
    updateURL();
    makeCode();
    initalizeTimer();
  });