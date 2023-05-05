console.log("JS working");

const dayEl = document.getElementById("numOfDays");
const pickupDateEl = document.getElementById("pickupDate");
const costBtnEl = document.getElementById("costBtn");
const over25ChargeEl = document.getElementById("noRadioBtn");
const under25surcharge = document.getElementById("yesRadioBtn");
over25ChargeEl.onclick = onageSelectorElChecked;
under25surcharge.onclick = onageSelectorElChecked;
costBtnEl.onclick = oncostBtnElClicked;

function onageSelectorElChecked() {
  console.log("onageSelectorElChecked Started");
  const surchageRow = document.getElementById("surchargeRow");
  if (under25surcharge.checked) {
    surchageRow.style.display = "table-row";
  } else {
    surchageRow.style.display = "none";
  }
  console.log("onageSelectorElChecked finished");
}

function oncostBtnElClicked() {
  console.log("oncostBtnElClicked Started");
  // calc base car rental cost
  const numOfDay = dayEl.value;
  const baseCarRentalCost = +numOfDay * 29.99;
  document.getElementById("carRentalBaseCost").innerHTML =
    baseCarRentalCost.toFixed(2);

  //calc options cost
  const eTollOption = document.getElementById("eToll");
  const gpsOption = document.getElementById("GPS");
  const roadsideOption = document.getElementById("roadside");
  let optionsCostPerDay = 0;
  if (eTollOption.checked) {
    optionsCostPerDay += 3.95;
  }
  if (gpsOption.checked) {
    optionsCostPerDay += 2.95;
  }
  if (roadsideOption.checked) {
    optionsCostPerDay += 2.95;
  }
  const totalOptionsCost = optionsCostPerDay * numOfDay;
  document.getElementById("optionsCost").innerHTML =
    totalOptionsCost.toFixed(2);

  //calc surcharge
  let surcharge = 0;
  if (under25surcharge.checked) {
    surcharge = 0.3 * baseCarRentalCost;
  }
  document.getElementById("ageSurcharge").innerHTML = surcharge.toFixed(2);

  //calc Total
  const totalCost = surcharge + totalOptionsCost + baseCarRentalCost;
  document.getElementById("totalRentalCost").innerHTML = totalCost.toFixed(2);
  //   console.log(optionsCostPerDay);
  //   console.log(eTollOption.checked);
  //   console.log(numOfDay);
  //   console.log(totalOptionsCost);
  console.log("oncostBtnElClicked finished");
}
