import countdownTimer from "./countdownTimer";
import updateDate from "./updateDate";

function update() {
  countdownTimer();
  updateDate();
  setInterval(() => {
    countdownTimer();
    updateDate();
  }, 60000);
}

export default update;
