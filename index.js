let measurmentExchange = {
    Length:{
        millimeter:1,
        centimeter:10,
        meter:1000,
        kilometer:1000000,
        inch:25.4,
        foot:304.8,
        yard:914.4,
        mile:1609344
    },
    Weight:{
        milligram:1,
        gram:1000,
        kilogram:1000000,
        ounce:28349.5231,
        pound:453592.37
    },
    Temperature:{
        Fahrenheit:(temp,toC)=>toC? (temp-32)/1.8: (temp*1.8)+32,
        Celsius:1,
        Kelvin:(temp,toC)=> toC?temp-273.15:temp+273.15,
    }
}

setUnit();

document.querySelectorAll(".measurment-choice").forEach((element)=>{
    element.addEventListener("click",setUnit);
});


function setUnit(e){
    //setting up underline and onclick style
    let activeMeasurment  = document.querySelector(".active-measurment");
    document.querySelectorAll(".measurment-choice").forEach((element)=>element.classList.remove("active-measurment"));
    activeMeasurment = e?e.currentTarget:activeMeasurment;
    activeMeasurment.classList.add("active-measurment");

    // set label for input
    document.getElementById("measurment").innerText = activeMeasurment.textContent.toLowerCase();

    //setting up option
    const optionContent = Object.entries(measurmentExchange[activeMeasurment.textContent]).map(e=>e[0])
    document.querySelectorAll(".input-container select").forEach(element=>{
        element.innerHTML =  "";
        optionContent.forEach(option=> element.innerHTML += `<option value=${option}>${option}</option>`);
    })
    reset();
}

function btnClick(){
    const actionText = document.querySelector("button").innerText;
    if(actionText=='Convert'){
        caculate();
    }else{
        reset();
    }
}

function caculate(){
    //getting input value
    let unitValue = document.querySelector("input").value;
    if(!unitValue ){
        return
    }
    unitValue = Number(unitValue);
    
    //getting current measurment and units
    const activeMeasurment  = document.querySelector(".active-measurment").textContent;
    const fromUnit = document.getElementById("unit-from").value;
    const toUnit = document.getElementById("unit-to").value;
    
    //Caculate value
    const toMediumUnit = measurmentExchange[activeMeasurment][fromUnit];
    const toTargetUnit = measurmentExchange[activeMeasurment][toUnit];
    const mediumValue = (typeof toMediumUnit == 'function')?toMediumUnit(unitValue,true):unitValue*toMediumUnit;
    const targetValue = (typeof toTargetUnit == 'function')?toTargetUnit(mediumValue,false):mediumValue/toTargetUnit;
    
    // showing up result
    result = targetValue;
    document.getElementById("from-value").innerText = unitValue +" "+ fromUnit;
    document.getElementById("to-value").innerText = result +" "+toUnit;
    document.querySelector("button").innerText = "Reset";
    reset("Reset",".label-input-container",".result-container");
}

//reset the screen 
function reset(buttonInnerText="Convert",
    hidden_target=".result-container",
    show_target=".label-input-container"){
    document.querySelector("button").innerText = buttonInnerText;
    document.querySelector(hidden_target).classList.add("hidden");
    document.querySelector(show_target).classList.remove("hidden");
}