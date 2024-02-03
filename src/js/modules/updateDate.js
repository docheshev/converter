function updateDate() {
  const lastUpdate = document.querySelector(".courses__last-update");
  const currentMonth = new Date().toLocaleString("ru", { month: "short" });
  const currentDate = addLeadingZero(new Date().getUTCDate());
  const currentYear = addLeadingZero(new Date().getUTCFullYear());
  const currencyHour = addLeadingZero(new Date().getUTCHours());
  const currencyMinutes = addLeadingZero(new Date().getUTCMinutes());

  function addLeadingZero(d) {
    return d < 10 ? "0" + d : d;
  }
  lastUpdate.innerText = "Получаем данные ...";

  lastUpdate.innerText = `Последнее обновление ${currentDate} ${currentMonth} ${currentYear}, ${currencyHour}:${currencyMinutes} UTC`;
}

export default updateDate;
