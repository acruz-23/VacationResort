//hide all inclusive content
document.getElementById("allInclusiveContent").style.display = "none";
console.log("Dining.js initiated");
//element declaration
const payAsYouGoDiningRadio = document.getElementById("payAsYouGoDining");
const allInclusiveDiningRadio = document.getElementById("allInclusiveDining");
//event checker
payAsYouGoDiningRadio.onclick = changeContentOnClick;
allInclusiveDiningRadio.onclick = changeContentOnClick;

function changeContentOnClick() {
  console.log("changeContentOnClick start");
  //element declaration
  const payAsyouGoContentEl = document.getElementById("payAsyouGoContent");
  const allInclusiveContentEl = document.getElementById("allInclusiveContent");
  console.log(payAsyouGoContentEl);

  //content switcher
  if (allInclusiveDiningRadio.checked) {
    payAsyouGoContentEl.style.display = "none";
    allInclusiveContentEl.style.display = "flex";
  }
  if (payAsYouGoDiningRadio.checked) {
    payAsyouGoContentEl.style.display = "flex";
    allInclusiveContentEl.style.display = "none";
  }

  console.log("changeContentOnClick end");
  return;
}
