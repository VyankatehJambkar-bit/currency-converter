let BASE_URL =  "https://v6.exchangerate-api.com/v6/22c73a1f53dd1cb9e4fd7a83/latest";



const dropdowns = document.querySelectorAll(".dropDown select");
const btn = document.querySelector("button");
const fromCurrn = document.querySelector("#from-select select");
const toCurrn = document.querySelector("#to-select select");
const messageBox = document.querySelector("#exchange");



for(let select of dropdowns){
    for(let currncode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currncode;
        newOption.value = currncode;
        
        if(select.name === "from" && currncode === "USD"){
            newOption.selected = "selected"
        }else if(select.name === "to" && currncode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption);
        
    }
    
    select.addEventListener("change",(evt)=>{                      //imp
        updateFlag(evt.target);
    })
}


function updateFlag(element){
    
    let currncode = element.value;
    let countryCode = countryList[currncode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");               // imp
    img.src = newSrc;

    
}
btn.addEventListener("click", async (evt)=>{

    // console.log(fromCurrn.value, toCurrn.value);
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    // console.log(amtVal);
    if(amtVal === "" || amtVal < 0){
        amount.value = "1"
    }

    const URL = `${BASE_URL}/${fromCurrn.value}`

    let responce = await fetch(URL);
    // console.log(responce)
    let data = await responce.json();
    // console.log(data)
    // console.log(data.conversion_rates["INR"])
    let conversionRate = data.conversion_rates[toCurrn.value];
    console.log(conversionRate)
    console.log(amtVal);
    
    let conversionAmount = conversionRate * amtVal 
    console.log(conversionAmount);
    messageBoxMsg(amtVal,conversionAmount);
    // amount.innerText = "";
    
    
    
});

function messageBoxMsg(amtVal,conversionAmount){
    messageBox.innerText = `${amtVal} ${fromCurrn.value} = ${conversionAmount.toFixed(2)} ${toCurrn.value}  `;
    console.log(messageBox)

}

