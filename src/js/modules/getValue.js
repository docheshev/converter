function getValue() {
  const selectGive = document.querySelector("#select-give"),
    selectGet = document.querySelector("#select-get"),
    changeBtn = document.querySelector(".courses__change-btn"),
    get = document.querySelector(".get"),
    give = document.querySelector(".give"),
    coursesForm = document.querySelector(".courses__form");
  let input = document.querySelector("#input"),
    resultInput = document.querySelector("#result"),
    changeValue = document.querySelectorAll(".change-value");

  getCurrencies();

  async function getCurrencies() {
    let url = "https://www.cbr-xml-daily.ru/daily_json.js";
    const response = await fetch(url),
      data = await response.json(),
      result = await data;

    const countryCode = result.Valute;

    for (const currencyCode in countryCode) {
      let optionTag = `<option value="${currencyCode}">${currencyCode}</option>`;
      selectGet.insertAdjacentHTML("beforeend", optionTag);
    }

    selectGet.addEventListener("change", (e) => {
      loadFlag(e.target);
    });

    function loadFlag(el) {
      for (const code in countryCode) {
        if (code == el.value) {
          let countryIcon = document.querySelector(".courses__currency-icon");
          let source = document.querySelector(".courses__get source");
          let nameOfCountry = countryCode[code].CharCode;
          countryIcon.src = `./img/icons/${nameOfCountry.toLowerCase()}.png`;
          source.srcset = `./img/icons/${nameOfCountry.toLowerCase()}.webp`;
        }
      }
    }

    window.onload = exchangeRateNoChange;
    selectGet.value = "USD";
    coursesForm.classList.add("no-change");
    loadFlag(selectGet);
    exchangeRateNoChange();
    input.value = 1;
    input.removeAttribute("readonly");
    resultInput.value = parseFloat(
      input.value / result.Valute[selectGet.value].Value
    ).toFixed(2);
    resultInput.setAttribute("readonly", "");
    selectGet.onchange = exchangeRateNoChange;
    selectGet.oninput = convertValueNoCnahge;
    input.oninput = convertValueNoCnahge;
    input.addEventListener("input", inputValueGive);
    resultInput.oninput = convertValueNoCnahge;
    resultInput.addEventListener("input", resultValueGet);
    selectGet.addEventListener("change", function () {
      inputValueGive();
    });
    changeBtn.onclick = convert;

    function convert(e) {
      e.preventDefault();
      if (coursesForm.classList.contains("no-change")) {
        get.appendChild(changeValue[0]);
        give.appendChild(changeValue[1]);
        coursesForm.classList.remove("no-change");
        coursesForm.classList.add("change");
        exchangeRateChange();
        resultInput.value = 1;
        resultInput.removeAttribute("readonly");
        input.value = parseFloat(
          resultInput.value * result.Valute[selectGet.value].Value
        ).toFixed(2);
        input.setAttribute("readonly", "");
        selectGet.onchange = exchangeRateChange;
        selectGet.oninput = convertValueChange;
        resultInput.focus();
        resultInput.oninput = convertValueChange;
        input.oninput = convertValueChange;
        selectGet.addEventListener("change", function () {
          resultValueGet();
        });
      } else {
        give.appendChild(changeValue[0]);
        get.appendChild(changeValue[1]);
        coursesForm.classList.add("no-change");
        coursesForm.classList.remove("change");
        exchangeRateNoChange();
        input.value = 1;
        input.removeAttribute("readonly");
        resultInput.value = parseFloat(
          input.value / result.Valute[selectGet.value].Value
        ).toFixed(2);
        resultInput.setAttribute("readonly", "");
        selectGet.onchange = exchangeRateNoChange;
        selectGet.oninput = convertValueNoCnahge;
        input.focus();
        input.oninput = convertValueNoCnahge;
        resultInput.oninput = convertValueNoCnahge;
        selectGet.addEventListener("change", function () {
          inputValueGive();
        });
      }
    }
    function exchangeRateNoChange() {
      const exchangeRateTxt = document.querySelector(
        ".courses__exchange-rates"
      );
      exchangeRateTxt.innerText = "Получаем данные ...";

      let amountVal = 1,
        exchangeRate = result.Valute[selectGet.value].Value,
        exchangeRatePrev = result.Valute[selectGet.value].Previous,
        valuteName = result.Valute[selectGet.value].Name,
        valuteGBP = "GBP",
        exchangeRub = "Российский рубль",
        totalExchangeRate = parseFloat((amountVal / exchangeRate).toFixed(2));

      let nameGBP = "Фунт стерлингов";
      if (selectGet.value == valuteGBP) {
        valuteName = nameGBP;
      }

      exchangeRateTxt.innerHTML = `<p class="courses__exchange-give" data-value="${selectGive.value}"><span>${amountVal}</span> ${exchangeRub} равен</p><p class="courses__exchange-get" data-value="${selectGet.value}"><span>${totalExchangeRate}</span> ${valuteName}</p>`;

      const exchangeRateHeight = document.querySelector(
        ".courses__exchange-get span"
      );
      if (exchangeRate > exchangeRatePrev) {
        exchangeRateHeight.classList.add("down");
        exchangeRateHeight.classList.remove("up");
      } else {
        exchangeRateHeight.classList.add("up");
        exchangeRateHeight.classList.remove("down");
      }
    }
    function exchangeRateChange() {
      const exchangeRateTxt = document.querySelector(
        ".courses__exchange-rates"
      );
      exchangeRateTxt.innerText = "Получаем данные ...";

      let amountVal = 1,
        exchangeRate = result.Valute[selectGet.value].Value,
        exchangeRatePrev = result.Valute[selectGet.value].Previous,
        valuteName = result.Valute[selectGet.value].Name,
        valuteGBP = "GBP",
        exchangeRub = "Российским рублям",
        totalExchangeRate = parseFloat((amountVal * exchangeRate).toFixed(2));
      let nameGBP = "Фунт стерлингов";
      if (selectGet.value == valuteGBP) {
        valuteName = nameGBP;
      }

      exchangeRateTxt.innerHTML = `<p class="courses__exchange-give" data-value="${selectGet.value}"><span>${amountVal}</span> ${valuteName} равен</p><p class="courses__exchange-get" data-value="${selectGive.value}"><span>${totalExchangeRate}</span> ${exchangeRub}</p>`;

      const exchangeRateHeight = document.querySelector(
        ".courses__exchange-get span"
      );
      if (exchangeRate > exchangeRatePrev) {
        exchangeRateHeight.classList.add("up");
        exchangeRateHeight.classList.remove("down");
      } else {
        exchangeRateHeight.classList.add("down");
        exchangeRateHeight.classList.remove("up");
      }
    }
    function convertValueNoCnahge() {
      if (input.value == 0) {
        resultInput.value = "";
      } else {
        resultInput.value = parseFloat(
          input.value / result.Valute[selectGet.value].Value
        ).toFixed(2);
      }
    }
    function convertValueChange() {
      if (resultInput.value == 0) {
        input.value = "";
      } else {
        input.value = parseFloat(
          resultInput.value * result.Valute[selectGet.value].Value
        ).toFixed(2);
      }
    }
    function inputValueGive() {
      let exchangeValueGive = document.querySelector(
        ".courses__exchange-give span"
      );
      let exchangeValueGet = document.querySelector(
        ".courses__exchange-get span"
      );

      if (input.value == 0) {
        exchangeRateNoChange();
      } else {
        exchangeValueGive.textContent = input.value.replace(
          /(\d)(?=(\d{3})+(\D|$))/g,
          "$1 "
        );
        exchangeValueGet.textContent = resultInput.value.replace(
          /(\d)(?=(\d{3})+(\D|$))/g,
          "$1 "
        );
        // selectGet.addEventListener("input", inputValueGive);
        // selectGet.addEventListener("change", resultValueGet);
      }
    }
    function resultValueGet() {
      let exchangeValueGive = document.querySelector(
        ".courses__exchange-give span"
      );
      let exchangeValueGet = document.querySelector(
        ".courses__exchange-get span"
      );

      if (resultInput.value == 0) {
        exchangeRateChange();
      } else {
        exchangeValueGive.textContent = resultInput.value.replace(
          /(\d)(?=(\d{3})+(\D|$))/g,
          "$1 "
        );
        exchangeValueGet.textContent = input.value.replace(
          /(\d)(?=(\d{3})+(\D|$))/g,
          "$1 "
        );
        // selectGet.addEventListener("input", inputValueGive);
        // selectGet.addEventListener("change", inputValueGive);
      }
    }
  }
}

export default getValue;
