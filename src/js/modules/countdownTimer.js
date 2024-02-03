function countdownTimer() {
  const semicircles = document.querySelectorAll(".courses__circle-semicircle");
  const timerSeconds = document.querySelector(".courses__timer-seconds");

  const sec = 60;

  const seconds = sec * 1000;
  const setTime = seconds;
  const startTime = Date.now();

  const futureTime = startTime + setTime;

  const timerLoop = setInterval(timer);

  function timer() {
    const currentTime = Date.now();
    const reminingTime = futureTime - currentTime;
    const angle = (reminingTime / setTime) * 360;

    if (angle > 180) {
      semicircles[2].style.display = "none";
      semicircles[0].style.transform = "rotate(180deg)";
      semicircles[1].style.transform = `rotate(${angle}deg)`;
    } else {
      semicircles[2].style.display = "block";
      semicircles[0].style.transform = `rotate(${angle}deg)`;
      semicircles[1].style.transform = `rotate(${angle}deg)`;
    }

    const secs = Math.floor((reminingTime / 1000) % 60);

    timerSeconds.innerText = secs;

    const lastUpdate = document.querySelector(".courses__last-update");
    const rates = document.querySelector(".courses__exchange-get span");

    if (reminingTime <= 0) {
      clearInterval(timerLoop);
      timerSeconds.innerText = "0";
      lastUpdate.classList.add("reload");
      rates.classList.add("reload");
      setTimeout(() => {
        lastUpdate.classList.remove("reload");
        rates.classList.remove("reload");
      }, 500);
    }
  }
}

export default countdownTimer;
