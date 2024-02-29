const mnURl = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies'
const dropdown = document.querySelectorAll(".dropdown select");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

for (let select  of dropdown) {
    for(let code in countryList){
       let newOption = document.createElement("option");
       newOption.innerText = code;
       newOption.value = code;
       if(select.name === 'from' && select.code === 'USD'){
        newOption.selected = "selected"
    }
     else if(select.name === 'to' && select.code === 'INR'){
        newOption.selected = "selected"
    }
    select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
      });
}        
const updateFlag = (Element) =>{
    // console.log(Element);
    let currCode = Element.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    let newSRc = `https://flagsapi.com/${countryCode}/flat/64.png`
    // console.log(newSRc);
   let img =  Element.parentElement.querySelector("img");
   img.src = newSRc;
}


const btn = document.querySelector("button");
btn.addEventListener ("click",async (evt)=>{
    evt.preventDefault();
    let amt = document.querySelector(".amount input");
    let amtValue = amt.value;
    console.log(amtValue)
    if(amtValue === '' || amtValue <= 1)
    {
    amtValue = 1;
    amt.value = "1";
}
// console.log(fromcurr.value,tocurr.value);
BSURL = `${mnURl}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
let response = await fetch(BSURL);
// console.log(response);
let data = await response.json();
let rate = data[tocurr.value.toLowerCase()]
// console.log(rate)
let finalAmt = amtValue * rate;
// console.log(finalAmt)
msg.innerText = `${amtValue} ${fromcurr.value} = ${finalAmt} ${tocurr.value}`
});



