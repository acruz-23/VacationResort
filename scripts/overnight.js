console.log("JS working");

const stayCostBtnEl = document.getElementById("stayCostBtn");
stayCostBtnEl.onclick = onStayCostBtnElClicked;

function onStayCostBtnElClicked() {
  console.log("onStayCostBtnElClicked Started");
  //Element declaration
  const stayDurationDays = +document.getElementById("stayDurationDays").value;
  const checkInFormEl = document.getElementById("checkInDate");
  const kingRoomEl = document.getElementById("kingRoom");
  const queenRoomEl = document.getElementById("queenRoom");
  const twoBedroomSuiteEl = document.getElementById("twoBedroomSuite");
  const stayCostEl = document.getElementById("stayCost");
  const discountEL = document.getElementById("roomDiscount");
  const discountedRoomCostEl = document.getElementById("discountedRoomCost");
  const baseRoomCostEl = document.getElementById("baseRoomCost");
  const taxAddedEl = document.getElementById("taxAdded");

  //check-in date and room type
  const checkInDate = new Date(checkInFormEl.value);
  console.log("Check in Date:", checkInDate);
  let roomType;
  if (kingRoomEl.checked) {
    roomType = "king";
  } else if (queenRoomEl.checked) {
    roomType = "queen";
  } else if (twoBedroomSuiteEl.checked) {
    roomType = "twoBedroom";
  }

  //form validation
  if (formValidation(stayDurationDays, checkInDate, roomType)) {
    return;
  }

  //room rate
  const originalRoomRate = getRoomRate(checkInDate, roomType);
  const discountRate = getDiscountRate();

  //Room Costs for stay
  const originalRoomCost = originalRoomRate * stayDurationDays;
  const discountedRoomCost = originalRoomCost * discountRate;
  const totalRoomCost = originalRoomCost - discountedRoomCost;

  //taxes
  const taxes = totalRoomCost * 0.12;

  //total
  const totalDue = totalRoomCost + taxes;

  //output
  baseRoomCostEl.innerHTML = originalRoomCost;
  discountEL.innerHTML = discountedRoomCost;
  discountedRoomCostEl.innerHTML = totalRoomCost;
  taxAddedEl.innerHTML = taxes;
  stayCostEl.innerHTML = totalDue;

  console.log("onStayCostBtnElClicked finished");
}
function formValidation(stayDurationDays, checkInDate, roomType) {
  //elements
  const messageDivEL = document.getElementById("messageDiv");
  const numOfAdults = +document.getElementById("numOfAdults").value;
  const numOfChildren = +document.getElementById("numOfChildren").value;

  //
  const currentDate = new Date();
  if (currentDate.getTime() > checkInDate.getTime()) {
    alert("NO TIME TRAVELING ALLOWED!!! >:(");
    return true;
  }
  //Stay Duration
  if (stayDurationDays < 1 || stayDurationDays > 28) {
    alert(`Duration of Stay Must be Between 1 and 28 Days.`);
    return true;
  }

  // Number of Adults/Children
  if (numOfAdults < 1 || numOfAdults > 4) {
    alert("Number of Adults must be between 1 and 4");
    return true;
  }
  if (numOfChildren < 0 || numOfChildren > 4) {
    alert("Number of Children must be between 1 and 4");
  }

  //Room occupancy
  const totalOccupants = numOfAdults + numOfChildren;
  if (roomType == "king" && totalOccupants > 2) {
    alert("King Room can only accommodate 2 people.");
    return true;
  }
  if (roomType == "queen" && totalOccupants > 5) {
    alert("Queen Room can only accommodate 5 people.");
    return true;
  }
  if (roomType == "twoBedroom" && totalOccupants > 6) {
    alert("2-Bedroom Suite can only accommodate 6 people.");
    return true;
  }

  return false;
}

function getRoomRate(checkInDate, roomType) {
  console.log("getRoomRate started");
  //base room rate
  let baseRate;
  if (roomType == "twoBedroom") {
    baseRate = 210;
  } else {
    baseRate = 150;
  }

  //season surcharge
  const checkInMonth = +checkInDate.getMonth();
  let inSeasonSurcharge;
  if (checkInMonth >= 5 && checkInMonth <= 7) {
    inSeasonSurcharge = (2 / 3) * baseRate;
  } else {
    inSeasonSurcharge = 0;
  }

  //Room rate
  const originalRoomRate = baseRate + inSeasonSurcharge;

  console.log("getRoomRate finished");
  return originalRoomRate;
}

function getDiscountRate() {
  console.log("getDiscountRate started");
  //element declarations
  const noDiscountEl = document.getElementById("noDiscount");
  const aaaSenriorDiscountEl = document.getElementById("aaaSenriorDiscount");
  const militaryDiscountEl = document.getElementById("militaryDiscount");

  //calc discount rate
  let discountRate;
  if (noDiscountEl.checked) {
    discountRate = 0;
  } else if (aaaSenriorDiscountEl.checked) {
    discountRate = 0.1;
  } else if (militaryDiscountEl.checked) {
    discountRate = 0.2;
  }

  console.log("getDiscountRate finished");
  return discountRate;
}
