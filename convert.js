
// Fetching URL for currency converter
const Base_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";


//  Accessing HTML Doc using DOM
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


    // country list updation logic
for (let select of dropdowns) {
  for (currCode in countryList) {
    console.log(currCode);
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    if (select.name === "from" && currCode === "USD")
    {
      newOption.selected = "Selected"; 
    } else if(select.name === "to" && currCode === "PKR")
    {
      newOption.selected = "Selected"; 
    } 
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  })
}


// Update Flag when user change the country list converter
const updateFlag = (element) => {
  console.log(element);
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}


//  Button update logic
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let ammount = document.querySelector(".amount input");
  let amtVal = ammount.value;
  console.log(amtVal);
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    ammount.value = "1";
  }
  let URL = `${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let onlyrate = data[toCurr.value.toLowerCase()];
  let finalAmount = amtVal * onlyrate;
  let withoutFloat = Math.floor(finalAmount);
  console.log(withoutFloat);
  msg.innerHTML = `${amtVal} ${fromCurr.value}= ${withoutFloat} ${toCurr.value}`; 
  });









